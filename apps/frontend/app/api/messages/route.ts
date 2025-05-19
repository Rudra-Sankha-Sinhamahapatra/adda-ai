import { NextRequest, NextResponse } from 'next/server';
import { getGeminiEmbedding } from '../../../lib/embeddingUtils';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { config } from '../../../config/config';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

type MessageSender = 'USER' | 'CHARACTER';

interface MessageData {
  id: string;
  content: string;
  sender: MessageSender;
  userId: string;
  characterId: string;
  metadata?: Record<string, unknown>;
  updatedAt: string;
  createdAt: string;
}

interface MessageEmbeddingData {
  id: string;
  messageId: string;
  embedding: number[];
  createdAt: string;
  updatedAt: string;
}

const API_KEY = config.gemini.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if(!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set. Please check your environment variables.");
}

const googleAI = createGoogleGenerativeAI({
  apiKey: API_KEY
});

type MessageRole = 'user' | 'assistant';

interface HistoryMessage {
  role: MessageRole;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log("Using API Key:", API_KEY ? "API key is present" : "No API key found");
    const { content, userId, characterId } = await req.json();

    const { data: character } = await supabaseAdmin
      .from('Character')
      .select('name, description, personality')
      .eq('id', characterId)
      .single();

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    let userMessageEmbedding: number[] | undefined;
    try {
      userMessageEmbedding = await getGeminiEmbedding(content);

      const now = new Date().toISOString();
      
      const messageData: MessageData = {
        id: uuidv4(),
        content,
        sender: 'USER',
        userId,
        characterId,
        metadata: {},
        updatedAt: now,
        createdAt: now
      };

      const { error: messageError } = await supabaseAdmin
        .from('Message')
        .insert(messageData);

      if (messageError) {
        console.error("Error storing message:", messageError);
        return NextResponse.json({ error: "Failed to store message" }, { status: 500 });
      }

      if (userMessageEmbedding) {
        const embeddingData: MessageEmbeddingData = {
          id: uuidv4(),
          messageId: messageData.id,
          embedding: userMessageEmbedding,
          createdAt: now,
          updatedAt: now
        };

        const { error: embeddingError } = await supabaseAdmin
          .from('MessageEmbedding')
          .insert(embeddingData);

        if (embeddingError) {
          console.error("Error storing embedding:", embeddingError);
        }
      }
    } catch (embeddingError) {
      console.error("Error generating user message embedding:", embeddingError);
      return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
    }
    
    let relevantHistory: HistoryMessage[] = [];
    try {
      if (userMessageEmbedding) {
        const { data: similarMessages } = await supabaseAdmin.rpc('match_messages', {
          query_embedding: userMessageEmbedding,
          match_threshold: 0.7,
          match_count: 5,
          p_user_id: userId,
          p_character_id: characterId
        });
        
        if (similarMessages && similarMessages.length > 0) {
          relevantHistory = similarMessages.map((msg: any) => ({
            role: msg.sender === 'USER' ? 'user' : 'assistant',
            content: msg.content
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching relevant history:", error);
    }
    
    let recentMessages: HistoryMessage[] = [];
    try {
      const { data: recent } = await supabaseAdmin
        .from('Message')
        .select('content, sender, createdAt')
        .eq('userId', userId)
        .eq('characterId', characterId)
        .order('createdAt', { ascending: false })
        .limit(10);
        
      if (recent && recent.length > 0) {
        recentMessages = recent.map((msg) => ({
          role: msg.sender === 'USER' ? 'user' : 'assistant',
          content: msg.content
        }));
      }
    } catch (error) {
      console.error("Error fetching recent messages:", error);
    }
    
    const seenContents = new Set<string>();
    const combinedMessages = [...relevantHistory, ...recentMessages]
      .filter(msg => {
        if (seenContents.has(msg.content)) return false;
        seenContents.add(msg.content);
        return true;
      })
      .slice(0, 10);
    
    const characterContext = `
      You are ${character.name}.
      Description: ${character.description}
      Personality: ${character.personality}
      
      Respond as this character with their unique personality and knowledge.
      Keep responses engaging, authentic to the character, and conversational.
      
      You have a memory system using vector embeddings that helps you recall 
      previous conversations with this user. Use this context when appropriate 
      to maintain continuity and demonstrate memory of past interactions.
    `.trim();

    const result = streamText({
      model: googleAI('gemini-2.0-flash'),
      system: characterContext,
      messages: [
        ...combinedMessages,
        { role: 'user', content }
      ],
      tools: {
        getConversationHistory: tool({
          description: `Get previous messages between this user with userId ${userId} and character with characterId ${characterId}. If you don't have any messages, return an empty array.`,
          parameters: z.object({
            limit: z.number().default(10).describe("Maximum number of messages to retrieve")
          }),
          execute: async ({ limit }) => {
            const { data } = await supabaseAdmin
              .from('Message')
              .select('content, sender, createdAt')
              .eq('userId', userId)
              .eq('characterId', characterId)
              .order('createdAt', { ascending: false })
              .limit(limit);
            
            return data || [];
          }
        })
      }
    });

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    let aiResponse = '';
    
    const textStream = result.textStream;
    (async () => {
      try {
        for await (const chunk of textStream) {
          aiResponse += chunk;
          await writer.write(new TextEncoder().encode(chunk));
        }
        
        if (!aiResponse || aiResponse.trim() === '') {
          aiResponse = "I'm sorry, I don't remember anything from our previous conversations.";
          await writer.write(new TextEncoder().encode(aiResponse));
        }
        
        await writer.close();
        
        try {
          const aiEmbedding = await getGeminiEmbedding(aiResponse);
          const now = new Date().toISOString();
          
          const aiMessageData: MessageData = {
            id: uuidv4(),
            content: aiResponse,
            sender: 'CHARACTER',
            userId,
            characterId,
            metadata: {},
            updatedAt: now,
            createdAt: now
          };
          
          const { error: messageError } = await supabaseAdmin
            .from('Message')
            .insert(aiMessageData);

          if (messageError) {
            console.error("Error storing AI message:", messageError);
          } else if (aiEmbedding) {

            const embeddingData: MessageEmbeddingData = {
              id: uuidv4(),
              messageId: aiMessageData.id,
              embedding: aiEmbedding,
              createdAt: now,
              updatedAt: now
            };

            const { error: embeddingError } = await supabaseAdmin
              .from('MessageEmbedding')
              .insert(embeddingData);

            if (embeddingError) {
              console.error("Error storing AI embedding:", embeddingError);
            }
          }
        } catch (embeddingError) {
          console.error("Error generating AI response embedding:", embeddingError);
        }
      } catch (error) {
        console.error("Error processing AI response:", error);
        writer.close();
      }
    })();
    
    return new Response(readable);
  } catch (error) {
    console.error("Error in message API:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const characterId = url.searchParams.get('characterId');
    const query = url.searchParams.get('query');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    if (!userId || !characterId) {
      return NextResponse.json(
        { error: "Missing userId or characterId" }, 
        { status: 400 }
      );
    }
    
    if (query && query.trim() !== '') {
      try {
        const embedding = await getGeminiEmbedding(query);
        
        const { data, error } = await supabaseAdmin.rpc('match_messages', {
          query_embedding: embedding,
          match_threshold: 0.5,
          match_count: limit,
          p_user_id: userId,
          p_character_id: characterId
        });
        
        if (error) {
          console.error("Error in semantic search:", error);
        } else {
          return NextResponse.json(data);
        }
      } catch (embeddingError) {
        console.error("Error generating query embedding:", embeddingError);
      }
    }
    
    const { data, error } = await supabaseAdmin
      .from('Message')
      .select('*')
      .eq('userId', userId)
      .eq('characterId', characterId)
      .order('createdAt', { ascending: true })
      .limit(limit);
  
    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET messages:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getGeminiEmbedding } from '@/lib/embeddingUtils';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { config } from '@/config/config';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';


const API_KEY = config.gemini.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if(!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set. Please check your environment variables.");
}

const googleAI = createGoogleGenerativeAI({
  apiKey: API_KEY
});

//post handler to send messages
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

    try {
      const embedding = await getGeminiEmbedding(content);
      
      const now = new Date().toISOString();
      

      const userMessageData = {
        id: uuidv4(), 
        content,
        embedding,
        sender: 'USER',
        userId,
        characterId,
        updatedAt: now,
        createdAt: now
      };

      const { error: insertError } = await supabaseAdmin
        .from('Message')
        .insert(userMessageData);

      if (insertError) {
        console.error("Error storing user message:", insertError);
        return NextResponse.json({ error: "Failed to store message" }, { status: 500 });
      }
    } catch (embeddingError) {
      console.error("Error generating user message embedding:", embeddingError);
      return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
    }

    
    const characterContext = `
      You are ${character.name}.
      Description: ${character.description}
      Personality: ${character.personality}
      
      Respond as this character with their unique personality and knowledge.
      Keep responses engaging, authentic to the character, and conversational.
    `.trim();

    const result = streamText({
      model: googleAI('gemini-2.0-flash'),
      system: characterContext,
      messages: [
        { role: 'user', content }
      ],
      tools: {
        getConversationHistory: tool({
          description: "Get previous messages between this user and character",
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
        

        await writer.close();
        
        try {
          const aiEmbedding = await getGeminiEmbedding(aiResponse);
   
          const now = new Date().toISOString();
          
          const aiMessageData = {
            id: uuidv4(), 
            content: aiResponse,
            embedding: aiEmbedding,
            sender: 'CHARACTER',
            userId,
            characterId,
            updatedAt: now,
            createdAt: now
          };
          
          await supabaseAdmin.from('Message').insert(aiMessageData);
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

// GET handler to fetch messages for a user and character
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const characterId = url.searchParams.get('characterId');
    
    if (!userId || !characterId) {
      return NextResponse.json(
        { error: "Missing userId or characterId" }, 
        { status: 400 }
      );
    }
    
    const { data, error } = await supabaseAdmin
      .from('Message')
      .select('*')
      .eq('userId', userId)
      .eq('characterId', characterId)
      .order('createdAt', { ascending: true });
    
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
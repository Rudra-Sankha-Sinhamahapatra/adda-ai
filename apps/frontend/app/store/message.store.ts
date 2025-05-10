import { create } from 'zustand'
import { sendMessage, fetchMessages } from '../services/messageService'
import Cookies from 'js-cookie';
import { Character, characterApi } from '../services/api';
import toast from 'react-hot-toast';

interface Message {
    id?: string;
    content: string;
    sender: "USER" | "CHARACTER" | {
        name: string;
        type:'user' | 'ai';
        avatar?:string;
    };
    timestamp?:string;
    characterId:string;
    userId:string;
    createdAt?: string;
}

interface MessageState {
    messages: Message[];
    characters: Character[];
    selectedCharacter: string;
    currentUserId:string | null;
    isLoading: boolean;
    sending:boolean;
    searchQuery: string;
    message: string;
    error: string | null;

    setMessage: (message: string) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCharacter: (characterId: string) => void;
    fetchCharacters: () => Promise<void>;
    loadMessages: (characterId: string, userId: string) => Promise<void>;
    sendMessage: (content:string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
    messages: [],
    characters:[],
    selectedCharacter:'',
    currentUserId: Cookies.get('userId') || null,
    message:'',
    searchQuery:'',
    isLoading: false,
    sending:false,
    error: null,

   setMessage: (message) => set({message}),
   setSearchQuery: (query) => set({ searchQuery: query }),
   setSelectedCharacter: (characterId) => {
    set({ selectedCharacter: characterId });
    const userId = get().currentUserId;
    if(userId) {
        get().loadMessages(characterId,userId);
    }
   },

   fetchCharacters: async () => {
       const loadingToast = toast.loading('Loading characters ...');
       try {
          set({isLoading:true});
          const characters = await characterApi.getAllCharacters();
          set({
            characters,
            selectedCharacter: characters.length > 0 ? characters[0].id : '',
            isLoading: false
          });
          toast.success("Characters loaded successfully ",{ id:loadingToast });
       } catch (error) {
          toast.error('Error loading characters',{ id:loadingToast });
          console.error('Error loading characters: ',error);
          set({ isLoading:false })
       }
   },
    loadMessages: async (characterId: string, userId: string) => {
          if(!characterId || !userId) {
            set({ error:"Missing CharacterId or UserId" })
            return;
          }
        try {
            set({ isLoading: true, error: null });
            const messageData = await fetchMessages(characterId, userId);
            const formattedMessages = messageData.map((msg:any):Message => ({
               id:msg.id,
               content:msg.content,
               sender: msg.sender === 'USER' ? 
               {name:'You',type:'user'}
               :{name:"AI",type:'ai'},
               characterId: msg.characterId || characterId,
               userId: msg.userId || userId,
               timestamp: msg.createdAt || new Date().toISOString(),
            }));

            set({
                messages: formattedMessages,
                isLoading: false,
            })
        } catch (error) {
            console.error("Error loading messages: ", error);
            set({
                error: error instanceof Error ? error.message : "Failed to load messages",
                isLoading: false,
            });
        }
    },

    sendMessage: async (content: string) => {
        const { selectedCharacter,currentUserId } = get();

        if (!content.trim() || !selectedCharacter || !currentUserId) {
            set({ error:"Missing charcterId or UserId" });
            return;
        }

          
        set({ sending: true,error:null });


        const userMessage: Message = {
            id:`user-${Date.now()}`,
            content,
            sender: { name: 'You',type:'user'},
            characterId: selectedCharacter,
            timestamp: new Date().toISOString(),
            userId: currentUserId
        }

        const aiMessage: Message = {
         id:'ai-'+ Date.now(),
         content: '',
         sender: { name: 'AI', type: 'ai' },
         characterId: selectedCharacter,
         userId: currentUserId,
         timestamp: new Date().toISOString(),
        }

        set(state => ({
            messages: [...state.messages,userMessage,aiMessage],
            message:''
        }));

        try {
            const result = await sendMessage({ 
                content, 
                userId:currentUserId, 
                characterId: selectedCharacter 
              });
        
              if (result?.stream) {
                const reader = result.stream.getReader();
                const decoder = new TextDecoder();
                let aiResponse = '';
        
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
        
                  const chunk = decoder.decode(value);
                  aiResponse += chunk;
        
                  set(state => {
                    const newMessages = [...state.messages];
                    const aiMessageIndex = newMessages.length - 1;
                    if (aiMessageIndex >= 0) {
                      newMessages[aiMessageIndex] = {
                        ...newMessages[aiMessageIndex],
                        content: aiResponse,
                      };
                    }
                    return { messages: newMessages };
                  });
                }
        
                toast.success('Message sent');
            }
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to send message",
            });
        } 
        finally {
            set({ sending: false,  isLoading: false });
        }
    }
}));


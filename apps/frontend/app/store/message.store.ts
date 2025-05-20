import { create } from 'zustand'
import { sendMessage, fetchMessages } from '../services/messageService'
import Cookies from 'js-cookie';
import { Character, characterApi } from '../services/api';
import toast from 'react-hot-toast';

interface MessageSender {
    name: string;
    type: 'user' | 'ai';
    avatar?: string;
}

interface Message {
    id?: string;
    content: string;
    sender: "USER" | "CHARACTER" | MessageSender;
    timestamp?: string;
    characterId: string;
    userId: string;
    createdAt?: string;
    metadata?: Record<string, unknown>;
}

interface MessageState {
    messages: Message[];
    characters: Character[];
    selectedCharacter: string;
    currentUserId: string | null;
    isLoading: boolean;
    sending: boolean;
    searchQuery: string;
    message: string;
    error: string | null;

    setMessage: (message: string) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCharacter: (characterId: string) => void;
    fetchCharacters: () => Promise<void>;
    loadMessages: (characterId: string, userId: string) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    searchMessages: (query: string) => Promise<Message[]>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
    messages: [],
    characters: [],
    selectedCharacter: '',
    currentUserId: Cookies.get('userId') || null,
    message: '',
    searchQuery: '',
    isLoading: false,
    sending: false,
    error: null,

    setMessage: (message) => set({ message }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCharacter: (characterId) => {
        set({ selectedCharacter: characterId });
        const userId = get().currentUserId;
        if (userId) {
            get().loadMessages(characterId, userId);
        }
    },

    fetchCharacters: async () => {
        const loadingToast = toast.loading('Loading characters ...');
        try {
            set({ isLoading: true });
            const characters = await characterApi.getAllCharacters();
            const currentSelected = get().selectedCharacter;
            set({
                characters,
                isLoading: false,
                selectedCharacter: currentSelected || ''
            });
            toast.success("Characters loaded successfully", { id: loadingToast });
        } catch (error) {
            toast.error('Error loading characters', { id: loadingToast });
            console.error('Error loading characters: ', error);
            set({ isLoading: false })
        }
    },

    loadMessages: async (characterId: string, userId: string) => {
        if (!characterId || !userId) {
            set({ error: "Missing CharacterId or UserId" })
            return;
        }
        try {
            set({ isLoading: true, error: null });
            const messageData = await fetchMessages(characterId, userId);
            const formattedMessages = messageData.map((msg: Message): Message => ({
                id: msg.id,
                content: msg.content,
                sender: msg.sender === 'USER' ?
                    { name: 'You', type: 'user' } :
                    { name: "AI", type: 'ai' },
                characterId: msg.characterId,
                userId: msg.userId,
                timestamp: msg.createdAt || new Date().toISOString(),
                metadata: msg.metadata
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
        const { selectedCharacter, currentUserId } = get();

        if (!content.trim() || !selectedCharacter || !currentUserId) {
            set({ error: "Missing characterId or UserId" });
            return;
        }

        set({ sending: true, error: null });

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            content,
            sender: { name: 'You', type: 'user' },
            characterId: selectedCharacter,
            timestamp: new Date().toISOString(),
            userId: currentUserId,
            metadata: {}
        }

        const aiMessage: Message = {
            id: 'ai-' + Date.now(),
            content: '',
            sender: { name: 'AI', type: 'ai' },
            characterId: selectedCharacter,
            userId: currentUserId,
            timestamp: new Date().toISOString(),
            metadata: {}
        }

        set(state => ({
            messages: [...state.messages, userMessage, aiMessage],
            message: ''
        }));

        try {
            const result = await sendMessage({
                content,
                userId: currentUserId,
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
            set({ sending: false, isLoading: false });
        }
    },

    searchMessages: async (query: string) => {
        const { selectedCharacter, currentUserId } = get();

        if (!selectedCharacter || !currentUserId || !query.trim()) {
            return [];
        }

        try {
            set({ isLoading: true, error: null });

            const url = new URL('/api/messages', window.location.origin);
            url.searchParams.append('userId', currentUserId);
            url.searchParams.append('characterId', selectedCharacter);
            url.searchParams.append('query', query);

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error('Failed to fetch semantic search results');
            }

            const messageData = await response.json();

            const formattedMessages = messageData.map((msg: Message): Message => ({
                id: msg.id,
                content: msg.content,
                sender: msg.sender === 'USER' ?
                    { name: 'You', type: 'user' } :
                    { name: "AI", type: 'ai' },
                characterId: msg.characterId,
                userId: msg.userId,
                timestamp: msg.createdAt || new Date().toISOString(),
                metadata: msg.metadata
            }));

            set({
                messages: formattedMessages,
                isLoading: false,
            });

            return formattedMessages;

        } catch (error) {
            console.error("Error in semantic search: ", error);
            set({
                error: error instanceof Error ? error.message : "Failed to search messages",
                isLoading: false,
            });
            return [];
        }
    }
}));


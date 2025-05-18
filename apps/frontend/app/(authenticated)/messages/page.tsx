'use client';

import { useEffect, useRef } from 'react';
import { Search, Brain, Star, User, Send, Clock, Sparkles, History } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import ProtectedRoute from '../../components/auth/protected-route';
import { useMessageStore } from '../../store/message.store';

export default function MessagesPage() {
  const { 
    messages, 
    characters, 
    selectedCharacter, 
    message, 
    currentUserId,
    searchQuery, 
    isLoading: loading, 
    sending,
    setMessage,
    setSearchQuery,
    setSelectedCharacter,
    fetchCharacters,
    loadMessages,
    sendMessage,
    searchMessages
  } = useMessageStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const initialMessageSent = useRef<boolean>(false);

  const currentCharacter = characters.find((char) => char.id === selectedCharacter);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    const loadInitialMessages = async () => {
      if (currentCharacter && currentUserId) {
        initialMessageSent.current = false;
        await loadMessages(currentCharacter.id, currentUserId);
      }
    };
    loadInitialMessages();
  }, [currentCharacter?.id, currentUserId]);

  useEffect(() => {
    let mounted = true;

    const sendInitialHi = async () => {
      if (!mounted) return;
      
      if (
        currentCharacter?.id && 
        currentUserId && 
        messages.length === 0 && 
        !sending && 
        !loading && 
        !initialMessageSent.current
      ) {
        try {
          initialMessageSent.current = true;
          await sendMessage("hi");
          if (mounted) {
            await loadMessages(currentCharacter.id, currentUserId);
          }
        } catch (error) {
          console.error("Error sending initial message:", error);
          if (mounted) {
            initialMessageSent.current = false;
          }
        }
      }
    };

    sendInitialHi();
    return () => {
      mounted = false;
    };
  }, [currentCharacter?.id, currentUserId, messages.length, sending, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedCharacter) return;
    
    await sendMessage(message);
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current && searchInputRef.current.value.trim()) {
      await searchMessages(searchInputRef.current.value);
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (character.personality || '').toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[85vh]">
            {/* Character Sidebar  */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-gray-200 bg-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">AI Characters</h2>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                    <Brain className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative mb-8">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search characters..."
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                
                {/* Character list */}
                <div className="space-y-3">
                  {filteredCharacters.map((character) => (
                    <button
                      key={character.id}
                      onClick={() => setSelectedCharacter(character.id)}
                      className={`w-full p-3.5 rounded-xl flex items-center space-x-4 transition-all ${
                        selectedCharacter === character.id
                          ? 'bg-purple-100 text-purple-700 shadow-sm'
                          : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <img
                            src={character.imageUrl}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span 
                          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                            character.status === 'online'
                              ? 'bg-green-400'
                              : character.status === 'thinking'
                              ? 'bg-yellow-400'
                              : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold">{character.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{character.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col h-[85vh]">
              {/* Chat Header */}
              {currentCharacter && (
                <div className="py-4 px-6 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={currentCharacter.imageUrl}
                        alt={currentCharacter.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{currentCharacter.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">{currentCharacter.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">{currentCharacter.personality}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* Memory Search */}
                    <form onSubmit={handleSearch} className="relative">
                      <Button 
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1.5 text-purple-600"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                    </form>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                      <Clock className="h-5 w-5 mr-1" />
                      <span className="hidden sm:inline">History</span>
                    </Button>
                    <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                      <Sparkles className="h-5 w-5 mr-1" />
                      <span className="hidden sm:inline">Boost</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Message Area */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white" style={{ height: "calc(85vh - 140px)" }}>
                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <div className="bg-purple-100 p-4 rounded-full mb-4">
                        <Brain className="h-16 w-16 text-purple-500" />
                      </div>
                      <p className="text-lg font-medium">Start a conversation with {currentCharacter?.name}</p>
                      <p className="text-sm text-gray-400 mt-2">Type a message below to begin chatting</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {messages.map((msg, idx) => {
                        const senderType = typeof msg.sender === 'object' ? msg.sender.type : (msg.sender === 'USER' ? 'user' : 'ai');
                        return (
                          <div
                            key={msg.id || idx}
                            className={`flex ${senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                              className={`max-w-[80%] sm:max-w-[70%] flex ${
                                senderType === 'user' ? 'flex-row-reverse' : 'flex-row'
                              } items-end`}
                            >
                              {senderType === 'ai' && (
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-3 mb-1 border-2 border-white shadow-sm flex-shrink-0">
                                  <img
                                    src={currentCharacter?.imageUrl}
                                    alt={typeof msg.sender === 'object' ? msg.sender.name : 'AI'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`${
                                  senderType === 'user'
                                    ? 'bg-purple-600 text-white rounded-tl-2xl rounded-tr-md rounded-bl-2xl'
                                    : 'bg-white text-gray-800 rounded-tr-2xl rounded-tl-md rounded-br-2xl shadow-md'
                                } p-4`}
                              >
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                              </div>
                              {senderType === 'user' && (
                                <div className="h-8 w-8 rounded-full overflow-hidden ml-3 mb-1 bg-purple-200 flex items-center justify-center flex-shrink-0 mr-2">
                                  <User className="h-5 w-5 text-purple-700" />
                                </div>
                              )}
                            </div>
                      </div>
                        );
                      })}
                      <div ref={messagesEndRef} className="pt-2" />
                    </div>
                  )}
                  </div>
              </div>

              {/* Message Input - Fixed at bottom */}
              <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10">
                <form onSubmit={handleSend} className="flex space-x-3">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message ${currentCharacter?.name || ''}...`}
                    disabled={sending || !selectedCharacter}
                    className="flex-1 py-3 px-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Button 
                    type="submit" 
                    disabled={sending || !message.trim() || !selectedCharacter}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5"
                  >
                    {sending ? 
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : 
                    <Send className="h-5 w-5" />
                    }
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 

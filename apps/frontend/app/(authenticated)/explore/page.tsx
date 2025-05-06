'use client';

import { useEffect, useState } from 'react';
import { Search, Brain, TrendingUp, Star, MessageCircle, Heart, Loader2 } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import ProtectedRoute from '@/app/components/auth/protected-route';
import { Character, characterApi } from '@/app/services/api';
import toast from 'react-hot-toast';

interface AICharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
  interactions: number;
  rating: number;
  trending?: boolean;
  imageUrl: string;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [characters,setCharacters] = useState<Character[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const loadingToast = toast.loading('Loading characters...');
    try {
      setLoading(true);
      const characters = await characterApi.getAllCharacters();
      setCharacters(characters);
      toast.success('Characters loaded successfully',{id:loadingToast});
    } catch (error) {
      toast.error('Error loading characters',{id:loadingToast});
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCharacters = characters.filter((character)=> 
    character.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
    character.description.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
    character.personality.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

 
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Explore AI Characters</h1>
                <p className="text-gray-600 mt-2">Chat with unique AI personalities and make new connections</p>
              </div>
              <Button className="bg-purple-600 text-white">
                <Brain className="h-5 w-5 mr-2" />
                Suggest Character
              </Button>
            </div>

            <div className="relative mb-8">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI characters by name, personality, or interests..."
                className="pl-10 py-4"
              />
              <Search className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            </div>
            {
              loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
                </div>
              ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((character) => (
                <div
                  key={character.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="h-48 bg-purple-100 relative">
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                    {character.trending && (
                      <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {character.name}
                      </h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm">{character.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{character.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {character.personality.split(', ').map((trait) => (
                        <span
                          key={trait}
                          className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {character.interactions.toLocaleString()} chats
                      </div>
                      <Button className="bg-purple-600 text-white">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
               )
              }
              {!loading && filteredCharacters.length === 0 && (
                <div className="text-center text-gray-600 mt-10">
                 <p className='text-gray-500'>No characters found</p>
                </div>
              )}  
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
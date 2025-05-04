'use client';

import { useState } from 'react';
import { Search, Brain, TrendingUp, Star, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import ProtectedRoute from '@/app/components/auth/protected-route';

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

  const aiCharacters: AICharacter[] = [
    {
      id: '1',
      name: 'Angry Masterji',
      description: 'A strict but loving Indian teacher who gets annoyed easily but has a heart of gold',
      personality: 'Strict, Passionate, Caring',
      interactions: 12340,
      rating: 4.8,
      trending: true,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXv3JuYHVAi00wb-l1lb33QEuCyOqJhLGbA&s'
    },
    {
      id: '2',
      name: 'Doctor Ramakant',
      description: 'A wise and experienced doctor who combines modern medicine with traditional wisdom',
      personality: 'Wise, Calm, Professional',
      interactions: 8902,
      rating: 4.9,
      trending: true,
      imageUrl: 'https://ideogram.ai/assets/progressive-image/balanced/response/7SGQ7R5HSs6ijb0QJB5wdQ'
    },
    {
      id: '3',
      name: 'Techy Kirat',
      description: 'A tech-savvy programmer who loves explaining complex concepts in simple terms',
      personality: 'Enthusiastic, Nerdy, Helpful',
      interactions: 5671,
      rating: 4.7,
      imageUrl: 'https://media.licdn.com/dms/image/v2/C5603AQFbOqG9og1S5g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517251237812?e=2147483647&v=beta&t=9ARUI1wnKPnPqqyy_Bmx7AK3mfJS-0zNzWp8-8Qu52g'
    },
    {
      id: '4',
      name: 'Angelina',
      description: 'A friendly life coach who helps you navigate through personal and professional challenges',
      personality: 'Empathetic, Motivating, Insightful',
      interactions: 7892,
      rating: 4.8,
      imageUrl: 'https://ideogram.ai/assets/progressive-image/balanced/response/o03E5sdcTJeVPEAF5d2WzQ'
    },
    {
      id: '5',
      name: 'Chef Rajesh',
      description: 'A passionate chef who shares cooking tips and stories from his culinary adventures',
      personality: 'Creative, Passionate, Entertaining',
      interactions: 4321,
      rating: 4.6,
      imageUrl: 'https://ideogram.ai/assets/progressive-image/balanced/response/kqqW1mfFT5OCexD0f62DIg'
    },
  ];

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
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCharacters.map((character) => (
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
'use client';

import { useState } from 'react';
import { Search, Brain, Star, User, Send, Clock, Sparkles } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import ProtectedRoute from '@/app/components/auth/protected-route';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    type: 'user' | 'ai';
    avatar?: string;
  };
  timestamp: string;
  thinking?: boolean;
  characterId: string;
}

interface AICharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatar: string;
  status: 'online' | 'thinking' | 'idle';
  rating: number;
}

const dummyCharacters: AICharacter[] = [
  {
    id: '1',
    name: 'Angry Masterji',
    description: 'Strict but loving Indian teacher',
    personality: 'Strict, Passionate, Caring',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXv3JuYHVAi00wb-l1lb33QEuCyOqJhLGbA&s',
    status: 'online',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Doctor Ramakant',
    description: 'Wise and experienced doctor',
    personality: 'Wise, Calm, Professional',
    avatar: 'https://ideogram.ai/assets/progressive-image/balanced/response/7SGQ7R5HSs6ijb0QJB5wdQ',
    status: 'idle',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Techy Kirat',
    description: 'Tech enthusiast and coding mentor',
    personality: 'Enthusiastic, Nerdy, Helpful',
    avatar: 'https://media.licdn.com/dms/image/v2/C5603AQFbOqG9og1S5g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517251237812?e=2147483647&v=beta&t=9ARUI1wnKPnPqqyy_Bmx7AK3mfJS-0zNzWp8-8Qu52g',
    status: 'online',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Angelina',
    description: 'Friendly life coach and mentor',
    personality: 'Empathetic, Motivating, Insightful',
    avatar: 'https://ideogram.ai/assets/progressive-image/balanced/response/o03E5sdcTJeVPEAF5d2WzQ',
    status: 'online',
    rating: 4.8
  },
  {
    id: '5',
    name: 'Chef Rajesh',
    description: 'Passionate chef and culinary expert',
    personality: 'Creative, Passionate, Entertaining',
    avatar: 'https://ideogram.ai/assets/progressive-image/balanced/response/kqqW1mfFT5OCexD0f62DIg',
    status: 'idle',
    rating: 4.6
  }
];

const characterMessages: { [key: string]: Message[] } = {
  '1': [ // Angry Masterji
    {
      id: '1',
      content: 'Namaste bacche! Late again for your studies?',
      sender: {
        name: 'Angry Masterji',
        type: 'ai',
        avatar: dummyCharacters[0].avatar
      },
      timestamp: '10:30 AM',
      characterId: '1'
    },
    {
      id: '2',
      content: 'Sorry Masterji, I was working on a coding project',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '10:31 AM',
      characterId: '1'
    },
    {
      id: '3',
      content: 'Accha! At least you\'re doing something productive. But remember - discipline is most important! Now tell me, what are you learning?',
      sender: {
        name: 'Angry Masterji',
        type: 'ai',
        avatar: dummyCharacters[0].avatar
      },
      timestamp: '10:32 AM',
      characterId: '1'
    },
    {
      id: '4',
      content: 'I\'m learning web development with React and Next.js',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '10:33 AM',
      characterId: '1'
    },
    {
      id: '5',
      content: 'Very good! But don\'t forget your fundamentals. First master HTML, CSS, and JavaScript properly. No shortcuts!',
      sender: {
        name: 'Angry Masterji',
        type: 'ai',
        avatar: dummyCharacters[0].avatar
      },
      timestamp: '10:34 AM',
      characterId: '1'
    }
  ],
  '2': [ // Doctor Ramakant
    {
      id: '1',
      content: 'Hello! How are you feeling today? Any specific health concerns you\'d like to discuss?',
      sender: {
        name: 'Doctor Ramakant',
        type: 'ai',
        avatar: 'https://ideogram.ai/assets/progressive-image/balanced/response/7SGQ7R5HSs6ijb0QJB5wdQ'
      },
      timestamp: '11:00 AM',
      characterId: '2'
    },
    {
      id: '2',
      content: 'I\'ve been having trouble sleeping lately due to work stress',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '11:01 AM',
      characterId: '2'
    },
    {
      id: '3',
      content: 'I understand. Stress-induced insomnia is quite common these days. Let\'s discuss some holistic approaches - have you tried meditation or pranayama?',
      sender: {
        name: 'Doctor Ramakant',
        type: 'ai',
        avatar: dummyCharacters[1].avatar
      },
      timestamp: '11:02 AM',
      characterId: '2'
    },
    {
      id: '4',
      content: 'No, I haven\'t tried those yet. Could you guide me?',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '11:03 AM',
      characterId: '2'
    },
    {
      id: '5',
      content: 'Start with simple deep breathing exercises before bed. Inhale for 4 counts, hold for 4, exhale for 4. Also, try to maintain a consistent sleep schedule and avoid screens 1 hour before bed.',
      sender: {
        name: 'Doctor Ramakant',
        type: 'ai',
        avatar: dummyCharacters[1].avatar
      },
      timestamp: '11:04 AM',
      characterId: '2'
    }
  ],
  '3': [ // Techy Kirat
    {
      id: '1',
      content: 'Hey there! �� Ready to dive into some cool tech stuff? What are you working on?',
      sender: {
        name: 'Techy Kirat',
        type: 'ai',
        avatar: dummyCharacters[2].avatar
      },
      timestamp: '09:30 AM',
      characterId: '3'
    },
    {
      id: '2',
      content: 'I\'m trying to learn React but getting stuck with state management',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '09:31 AM',
      characterId: '3'
    },
    {
      id: '3',
      content: 'Ah, state management! 🚀 It\'s a common challenge. Let\'s break it down - are you using useState hooks or considering something more robust like Redux or Zustand?',
      sender: {
        name: 'Techy Kirat',
        type: 'ai',
        avatar: dummyCharacters[2].avatar
      },
      timestamp: '09:32 AM',
      characterId: '3'
    },
    {
      id: '4',
      content: 'I\'m using useState but my components are getting messy with prop drilling',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '09:33 AM',
      characterId: '3'
    },
    {
      id: '5',
      content: 'Perfect time to introduce Context API! It\'s built into React and can help avoid prop drilling. Want me to show you a quick example? 💻',
      sender: {
        name: 'Techy Kirat',
        type: 'ai',
        avatar: dummyCharacters[2].avatar
      },
      timestamp: '09:34 AM',
      characterId: '3'
    }
  ],
  '4': [ // Angelina
    {
      id: '1',
      content: 'Welcome! 🌟 I\'m here to help you navigate life\'s challenges. What\'s on your mind today?',
      sender: {
        name: 'Angelina',
        type: 'ai',
        avatar: dummyCharacters[3].avatar
      },
      timestamp: '2:00 PM',
      characterId: '4'
    },
    {
      id: '2',
      content: 'I\'m feeling stuck in my career. Not sure if I should switch jobs or stay put.',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '2:01 PM',
      characterId: '4'
    },
    {
      id: '3',
      content: 'That\'s a common feeling! Let\'s explore what\'s making you feel stuck. What aspects of your current job bring you joy, and what\'s missing?',
      sender: {
        name: 'Angelina',
        type: 'ai',
        avatar: dummyCharacters[3].avatar
      },
      timestamp: '2:02 PM',
      characterId: '4'
    },
    {
      id: '4',
      content: 'I love my team, but I don\'t feel challenged anymore. I want to grow but don\'t see opportunities here.',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '2:03 PM',
      characterId: '4'
    },
    {
      id: '5',
      content: 'I hear you! Growth is essential for fulfillment. Before making a decision, let\'s create a personal development plan. Have you considered talking to your manager about new responsibilities? Sometimes opportunities are closer than we think! 💫',
      sender: {
        name: 'Angelina',
        type: 'ai',
        avatar: dummyCharacters[3].avatar
      },
      timestamp: '2:04 PM',
      characterId: '4'
    }
  ],
  '5': [ // Chef Rajesh
    {
      id: '1',
      content: 'Namaste! 👨‍🍳 Ready to create some culinary magic today? What would you like to cook?',
      sender: {
        name: 'Chef Rajesh',
        type: 'ai',
        avatar: dummyCharacters[4].avatar
      },
      timestamp: '3:00 PM',
      characterId: '5'
    },
    {
      id: '2',
      content: 'I want to make butter chicken but I\'m a beginner. Is it too difficult?',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '3:01 PM',
      characterId: '5'
    },
    {
      id: '3',
      content: 'Ah, butter chicken! 🍗 Don\'t worry, every master chef was once a beginner. The key is in marinating the chicken properly. Shall we start with the ingredients list?',
      sender: {
        name: 'Chef Rajesh',
        type: 'ai',
        avatar: dummyCharacters[4].avatar
      },
      timestamp: '3:02 PM',
      characterId: '5'
    },
    {
      id: '4',
      content: 'Yes please! What ingredients do I need?',
      sender: {
        name: 'You',
        type: 'user',
        avatar: undefined
      },
      timestamp: '3:03 PM',
      characterId: '5'
    },
    {
      id: '5',
      content: 'Perfect! For the marinade, you\'ll need: yogurt, tandoori masala, ginger-garlic paste, and kashmiri red chili powder. For the gravy: butter, tomatoes, cashews, cream, and our special garam masala. Want me to guide you step by step? 🌶️',
      sender: {
        name: 'Chef Rajesh',
        type: 'ai',
        avatar: dummyCharacters[4].avatar
      },
      timestamp: '3:04 PM',
      characterId: '5'
    }
  ]
};

export default function MessagesPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCharacter = dummyCharacters.find(char => char.id === selectedCharacter);
  const currentMessages = characterMessages[selectedCharacter] || [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6 bg-white rounded-xl shadow-lg overflow-hidden min-h-[80vh]">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-200 bg-gray-50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">AI Characters</h2>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Brain className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative mb-6">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search characters..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {dummyCharacters.map((character) => (
                    <button
                      key={character.id}
                      onClick={() => setSelectedCharacter(character.id)}
                      className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                        selectedCharacter === character.id
                          ? 'bg-purple-50 text-purple-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={character.avatar}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span 
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            character.status === 'online' ? 'bg-green-400' :
                            character.status === 'thinking' ? 'bg-yellow-400' :
                            'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900">{character.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {character.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="col-span-9 flex flex-col">
              {/* Chat Header */}
              {currentCharacter && (
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={currentCharacter.avatar}
                        alt={currentCharacter.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{currentCharacter.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">{currentCharacter.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">{currentCharacter.personality}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-purple-600">
                      <Clock className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-600">
                      <Sparkles className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] flex ${
                        msg.sender.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {msg.sender.type === 'ai' && (
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img
                            src={msg.sender.avatar}
                            alt={msg.sender.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`${
                          msg.sender.type === 'user'
                            ? 'bg-purple-600 text-white rounded-l-xl rounded-tr-xl'
                            : 'bg-white text-gray-800 rounded-r-xl rounded-tl-xl'
                        } p-3 shadow-sm`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle message send
                    setMessage('');
                  }}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Chat with ${currentCharacter?.name}...`}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-purple-600 text-white px-6">
                    <Send className="h-5 w-5" />
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

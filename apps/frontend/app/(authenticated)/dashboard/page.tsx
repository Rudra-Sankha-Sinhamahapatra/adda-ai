'use client';

import { suggestedCharacters } from '@/lib/suggestedCharacters';
import { useAuthStore } from '../../store/auth.store';
import { MessageCircle, Star, TrendingUp } from 'lucide-react';
import { Active } from "../../components/active"
import { Offline } from '../../components/offline';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden bg-white shadow-xl shadow-purple-500/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Here's whats happening here .Chat with ai characters to explore more
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Characters
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    5
                  </dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Eligible Messages
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    5
                  </dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Profile Views
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
                  </dd>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h2>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white">
                  <div className="p-4 text-center text-gray-500">
                    No recent activity to show.
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Suggested Chacracters
                </h2>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white">
                  <div className="p-4 text-center text-gray-500">
                    <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
                      {suggestedCharacters.map((character,index) => (
                        <div
                        key={index}
                        className='bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]'
                        >
                        <div className='h-48 bg-purple-100 relative'>
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

                        <div className='p-6'>
                          <div className='flex items-center justify-between mb-3'>
                            <h3 className='text-xl font-semibold text-gray-900'>
                              {character.name}
                            </h3>
                            <div className='flex items-center text-yellow-500'>
                             <Star className='h-4 w-4 fill-current'/>
                             <span className='ml-1 text-sm'>{character.rating}</span>
                            </div>
                          </div>

                          <p className='text-gray-600 mb-4'>
                         {character.description}
                          </p>

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

                    <div className='flex items-center justify-between'>
                     <div className='text-sm text-gray-500 flex items-center'>
                      <MessageCircle className='h-4 w-4 mr-1'/>
                      {character.interactions.toLocaleString()} chats
                     </div>
                     <div className="flex items-center">
                      {character.status === 'ACTIVE' ? <Active />:<Offline/>}
                     </div>
                    </div>
                        </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
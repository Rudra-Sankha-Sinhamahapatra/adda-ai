'use client';

import { useAuthStore } from '../../store/auth.store';

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
                Here's what's happening in your network today.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Connections
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
                  </dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Unread Messages
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    0
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
                  Suggested Connections
                </h2>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white">
                  <div className="p-4 text-center text-gray-500">
                    Start connecting with people to see suggestions.
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
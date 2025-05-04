'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { useAuthStore } from '@/app/store/auth.store';

export default function Profile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    router.push('/signin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    try {
      await updateProfile({ name, email });
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden bg-white shadow-xl shadow-purple-500/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Update your account profile information.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <Input
                  label="Full name"
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  required
                />

                <Input
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  required
                />

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-500">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-800">{success}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                  >
                    Save changes
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-10 overflow-hidden bg-white shadow-xl shadow-purple-500/5 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Delete Account
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Once you delete your account, you will lose all data associated
                  with it.
                </p>
              </div>
              <div className="mt-5">
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                  onClick={() => {
                    // Implement account deletion
                  }}
                >
                  Delete account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
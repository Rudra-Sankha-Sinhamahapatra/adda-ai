'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loadUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      loadUser().then((result) => {
        if (!user) {
          router.push('/signin');
        }
      });
    }
  }, [user, loadUser, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return <>{children}</>;
} 
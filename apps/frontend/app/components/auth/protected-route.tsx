'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';
import { Route } from 'next';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const validateAuth = async () => {
      setIsLoading(true);
      const isValid = await checkAuth();
      if (!isValid) {
        router.push('/login' as Route);
      }
      setIsLoading(false);
    };

    validateAuth();
  }, [checkAuth, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unauthorized access. Please log in.</p>
      </div>
    );
  }

  return <>{children}</>;
} 
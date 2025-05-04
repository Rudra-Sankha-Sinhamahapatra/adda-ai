'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadUser = useAuthStore(state => state.loadUser);

  useEffect(() => {
    // Check authentication status on mount
    loadUser();
  }, [loadUser]);

  return <>{children}</>;
} 
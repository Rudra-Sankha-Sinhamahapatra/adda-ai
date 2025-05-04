'use client';

import ProtectedRoute from '../components/auth/protected-route';
import Navbar from '../components/navigation/navbar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
} 
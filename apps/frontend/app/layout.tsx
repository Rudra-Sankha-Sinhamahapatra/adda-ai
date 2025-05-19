import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/providers/auth-provider';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Adda AI - Connect, Share, and Grow Together',
  description: 'Join our vibrant community where ideas flourish, connections thrive, and conversations inspire.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
        <Analytics mode="production"/>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { Button } from '@repo/ui/button';

export function Navbar() {
  return (
    <nav className="container mx-auto flex items-center justify-between px-4 py-6">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          Adda AI
        </Link>
        <Link href="/">
        <Button variant="ghost" className='text-gray-600 hover:text-purple-600 cursor-pointer' size="sm">
            Home
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/signin">
          <Button variant="ghost" className='text-white bg-purple-600 hover:bg-purple-700 cursor-pointer px-4 py-2' size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="ghost" className='text-black hover:text-purple-600 cursor-pointer bg-none' size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
} 
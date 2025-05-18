'use client';

import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { ChevronRight, MessageCircle, Users, Sparkles, Globe, Shield, Zap } from 'lucide-react';
import { useAuthStore } from './store/auth.store';
import { Route } from 'next';

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            Adda AI
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:text-white hover:bg-purple-600 cursor-pointer">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => signOut()}
                className="text-gray-600 hover:text-purple-600 cursor-pointer"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signin">
                <Button variant="ghost" className='hover:text-purple-600 cursor-pointer'>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 text-white cursor-pointer">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-sm text-purple-700">
            ✨ Introducing Adda AI - The Future of Social Connection
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            Connect, Share, and{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Join our vibrant community where ideas flourish, connections thrive, and conversations inspire.
            Experience the next generation of social interaction with AI-powered insights.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="group min-w-[200px] bg-purple-600 text-white cursor-pointer py-2">
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" className="group min-w-[200px] bg-purple-600 text-white cursor-pointer py-2">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
            <Link href={'/about' as Route}>
              <Button variant="outline" size="lg" className="min-w-[200px] py-2 cursor-pointer border-purple-600">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-purple-600" />
              <span>50K+ Messages</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
              <span>99% Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Everything you need to connect and grow
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our platform combines the best of social networking with cutting-edge AI to create
            meaningful connections and foster growth.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <MessageCircle className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Smart Conversations</h3>
            <p className="text-gray-600">Engage in meaningful discussions enhanced by AI-powered insights and recommendations.</p>
          </div>

          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-pink-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
              <Users className="h-6 w-6 text-pink-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Community Building</h3>
            <p className="text-gray-600">Connect with like-minded individuals and build lasting relationships in your network.</p>
          </div>

          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <Sparkles className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Smart Insights</h3>
            <p className="text-gray-600">Get personalized recommendations and discover content that matters to you.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why choose Adda AI?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Experience the perfect blend of human connection and artificial intelligence.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with people from around the world and expand your horizons."
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Your privacy and security are our top priorities. Feel safe while sharing."
              },
              {
                icon: Zap,
                title: "Real-time Interaction",
                description: "Experience seamless, instant communication with zero lag."
              },
              {
                icon: Users,
                title: "Community First",
                description: "Join interest-based communities and grow together."
              },
              {
                icon: MessageCircle,
                title: "Smart Conversations",
                description: "AI-powered chat suggestions and content recommendations."
              },
              {
                icon: Sparkles,
                title: "Personal Growth",
                description: "Learn and evolve through meaningful interactions and feedback."
              }
            ].map((benefit, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow transition-all hover:shadow-lg">
                <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to join our community?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-100">
            Start connecting with like-minded individuals and experience the future of social networking today.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white text-purple-600 hover:bg-purple-50">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white text-purple-600 hover:bg-purple-50">
                  Get Started
                </Button>
              </Link>
            )}
            <Link href={'/about' as Route}>
              <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

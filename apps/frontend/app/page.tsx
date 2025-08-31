'use client';

import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { ChevronRight, MessageCircle, Users, Sparkles, Globe, Shield, Zap } from 'lucide-react';
import { useAuthStore } from './store/auth.store';
import { Route } from 'next';
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react';

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 0.50, 0.75, 1], [0, -40, -200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.68, 1], [1, 1, 0, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">

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

      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center" ref={heroRef}>
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-sm text-purple-700">
            ✨ Meet Your AI Companions on Adda AI
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            Chat with Unique{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Characters
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Discover and interact with diverse AI personalities. From mentors to friends,
            find meaningful conversations that enrich your daily life with our advanced AI companions.
          </p>
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-[2.5rem] p-1 will-change-transform"
              style={{
                y,
                opacity,
                background: "radial-gradient(circle at 60% 40%, #a78bfa 0%, #f472b6 60%, #f3e8ff 100%)",
                boxShadow: "0 8px 40px 0 rgba(168,139,250,0.25), 0 1.5px 8px 0 rgba(244,114,182,0.15)"
              }}
            >
              <motion.div
                className="absolute -top-10 -left-10 w-60 h-60 rounded-full blur-3xl opacity-40 z-0"
                style={{
                  background: "radial-gradient(circle, #f472b6 0%, #a78bfa 80%, transparent 100%)"
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <img
                src="https://pbs.twimg.com/media/GzrslsbWQAAcRXy?format=jpg&name=medium"
                alt="AI Characters"
                className="rounded-2xl shadow-lg max-w-full h-auto w-[600px] md:w-[800px] lg:w-[1200px] object-cover"
              />
            </motion.div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="group min-w-[200px] bg-purple-600 text-white cursor-pointer py-2">
                  Meet Characters
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" className="group min-w-[200px] bg-purple-600 text-white cursor-pointer py-2">
                  Start Chatting
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
            <Link href={'/about' as Route}>
              <Button variant="outline" size="lg" className="min-w-[200px] py-2 cursor-pointer border-purple-600">
                View Characters
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              <span>5+ Characters</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-purple-600" />
              <span>1K+ Chats</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section >


      < section className="container mx-auto px-4 py-20" >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Experience AI Characters Like Never Before
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our AI companions combine personality, knowledge, and emotional intelligence
            to create truly engaging conversations and meaningful interactions.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <MessageCircle className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Natural Conversations</h3>
            <p className="text-gray-600">Chat with AI characters that understand context, remember your interactions, and respond naturally.</p>
          </div>

          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-pink-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
              <Users className="h-6 w-6 text-pink-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Diverse Characters</h3>
            <p className="text-gray-600">Choose from a wide range of AI personalities, each with unique traits, knowledge, and conversation styles.</p>
          </div>

          <div className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-4 rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <Sparkles className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Memory & Learning</h3>
            <p className="text-gray-600">AI companions that remember your conversations and adapt to your interaction style over time.</p>
          </div>
        </div>
      </section >

      < section className="bg-purple-50 py-20" >
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Adda AI Characters?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Experience companionship, learning, and entertainment through advanced AI interactions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Multilingual Chat",
                description: "Chat with AI characters in multiple languages, breaking communication barriers."
              },
              {
                icon: Shield,
                title: "Private & Secure",
                description: "Your conversations are private and protected. Chat with confidence."
              },
              {
                icon: Zap,
                title: "Instant Responses",
                description: "Get thoughtful replies instantly, any time of day or night."
              },
              {
                icon: Users,
                title: "Character Variety",
                description: "From mentors to friends, find the perfect AI companion for every mood."
              },
              {
                icon: MessageCircle,
                title: "Deep Conversations",
                description: "Engage in meaningful discussions with contextually aware AI."
              },
              {
                icon: Sparkles,
                title: "Continuous Learning",
                description: "Characters that evolve and adapt to your conversation style."
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
      </section >

      <section className="relative overflow-hidden py-20 text-white" style={{
        background: "linear-gradient(120deg, #a78bfa 0%, #f472b6 60%, #f3e8ff 100%)"
      }}>
        <motion.div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #f472b6 0%, #a78bfa 80%, transparent 100%)"
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to meet your AI companion?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-100">
            Start chatting with unique AI characters and experience conversations that inspire, entertain, and enrich your life.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white text-purple-600 hover:bg-purple-50 p-2 border border-purple-600">
                  Start Chatting
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white text-purple-600 hover:bg-purple-50 py-2">
                  Meet Characters
                </Button>
              </Link>
            )}
            <Link href={'/about' as Route}>
              <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/10 py-2">
                View Characters
              </Button>
            </Link>
          </div>
        </div>
      </section >
    </div >
  );
}

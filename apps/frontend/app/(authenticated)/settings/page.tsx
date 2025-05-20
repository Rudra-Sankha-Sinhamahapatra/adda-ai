'use client';

import { useState } from 'react';
import { Bell, Lock, User, Moon, Globe, Shield, ChevronRight, Settings2, Construction } from 'lucide-react';
import ProtectedRoute from '../../components/auth/protected-route';
import { Button } from '@repo/ui/button';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');

  const sections: SettingSection[] = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your account information and preferences',
      icon: <User className="h-5 w-5" />,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security options',
      icon: <Lock className="h-5 w-5" />,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Customize your notification preferences',
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize the app appearance and theme',
      icon: <Moon className="h-5 w-5" />,
    },
    {
      id: 'language',
      title: 'Language & Region',
      description: 'Set your preferred language and regional settings',
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Review our privacy policy and terms',
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="bg-purple-100 rounded-full p-4">
                    <Settings2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-purple-600 rounded-full p-2">
                    <Construction className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Settings Coming Soon
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  We're working hard to bring you a comprehensive settings panel. This feature will be available in the next update.
                </p>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </Button>
                  <Button
                    className="bg-purple-600 text-white hover:bg-purple-700"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
              {sections.map((section, index) => (
                <button
                  key={index}
                  disabled
                  className="w-full p-4 border-b border-gray-200/50 flex items-center justify-between transition-colors opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-400">
                      {section.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-600">{section.title}</h3>
                      <p className="text-sm text-gray-400">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
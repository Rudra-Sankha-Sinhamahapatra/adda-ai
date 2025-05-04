'use client';

import { useState } from 'react';
import { Bell, Lock, User, Moon, Globe, Shield, ChevronRight } from 'lucide-react';
import ProtectedRoute from '@/app/components/auth/protected-route';

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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {sections.map((section,index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full p-4 border-b border-gray-200 flex items-center justify-between transition-colors hover:bg-gray-50 ${
                    activeSection === section.id ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-purple-600 ${
                      activeSection === section.id ? 'text-purple-700' : ''
                    }`}>
                      {section.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
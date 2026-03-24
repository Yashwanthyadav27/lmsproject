'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              📚 LMS
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/subjects" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Courses
              </Link>
              {isAuthenticated && (
                <Link href="/profile" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  My Progress
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden sm:block">Hi, {user?.name} 👋</span>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

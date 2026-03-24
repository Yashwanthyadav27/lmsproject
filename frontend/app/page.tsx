'use client';

import { useEffect, useState } from 'react';
import SubjectCard from '@/components/SubjectCard';
import Navbar from '@/components/Navbar';
import apiClient from '@/lib/apiClient';

interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  _count: {
    sections: number;
  };
}

export default function HomePage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await apiClient.get('/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to LMS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Your platform for continuous learning and professional development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/subjects"
                className="inline-block bg-white text-pink-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-pink-50 transition-all transform hover:scale-105"
              >
                Explore Courses
              </a>
              <a
                href="/auth/register"
                className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition-all transform hover:scale-105 border-2 border-white"
              >
                Start Learning
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Courses
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our curated collection of programming courses
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

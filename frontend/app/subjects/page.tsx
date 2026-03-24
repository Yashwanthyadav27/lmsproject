'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SubjectCard from '@/components/SubjectCard';
import apiClient from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';

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

export default function SubjectsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

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
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-4">
            All Courses
          </h1>
          <p className="text-lg text-gray-600">
            Explore our curated collection of programming courses
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-pink-100">
            <p className="text-gray-600">No courses available at the moment.</p>
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

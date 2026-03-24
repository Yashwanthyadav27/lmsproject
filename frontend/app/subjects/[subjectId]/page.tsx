'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import apiClient from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const fetchSubject = async () => {
      try {
        const response = await apiClient.get(`/subjects/${params.subjectId}/tree`);
        setSubject(response.data);
      } catch (error) {
        toast.error('Failed to load subject');
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [params.subjectId, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          sections={subject.sections} 
          subjectId={subject.id as string}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">{subject.title}</h1>
          <p className="text-gray-600 mb-8">{subject.description}</p>
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">
              Select a video from the sidebar to start learning. Videos unlock sequentially as you complete them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

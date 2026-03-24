'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import apiClient from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import { CheckCircle, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        // Fetch all subjects to get progress
        const subjectsRes = await apiClient.get('/subjects');
        const subjects = subjectsRes.data;

        const progressData = await Promise.all(
          subjects.map(async (subject: any) => {
            try {
              const treeRes = await apiClient.get(`/subjects/${subject.id}/tree`);
              const tree = treeRes.data;
              
              const allVideos = tree.sections.flatMap((s: any) => s.videos);
              const completedVideos = allVideos.filter((v: any) => v.completed);
              const totalVideos = allVideos.length;
              const completedCount = completedVideos.length;
              const percentage = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

              return {
                ...subject,
                totalVideos,
                completedCount,
                percentage,
              };
            } catch (error) {
              return null;
            }
          })
        );

        setProgress(progressData.filter(Boolean));
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [isAuthenticated, router]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-2">
            My Progress
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, {user?.name}! 👋</p>
        </div>

        {progress.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-pink-100">
            <BookOpen className="w-16 h-16 text-pink-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No progress yet</h3>
            <p className="text-gray-600 mb-4">Start learning to track your progress!</p>
            <a
              href="/subjects"
              className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progress.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-pink-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mr-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">Progress</span>
                    <span className="font-bold text-pink-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-pink-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-pink-100">
                  <p className="text-sm text-gray-600 flex items-center justify-between">
                    <span className="flex items-center">
                      <CheckCircle className="inline w-4 h-4 text-green-500 mr-2" />
                      {item.completedCount} of {item.totalVideos} videos
                    </span>
                    {item.percentage === 100 && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Completed 🎉
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

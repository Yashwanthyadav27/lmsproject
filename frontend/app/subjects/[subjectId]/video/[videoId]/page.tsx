'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer';
import apiClient from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [subject, setSubject] = useState<any>(null);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
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

        // Find current video
        const allVideos = response.data.sections.flatMap((s: any) => s.videos);
        const video = allVideos.find((v: any) => v.id === params.videoId);
        setCurrentVideo(video);
      } catch (error) {
        toast.error('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [params.subjectId, params.videoId, isAuthenticated, router]);

  const handleProgressSave = async (position: number, completed: boolean) => {
    try {
      await apiClient.post(`/progress/videos/${params.videoId}`, {
        last_position_seconds: Math.floor(position),
        is_completed: completed,
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const navigateToVideo = (videoId: string) => {
    router.push(`/subjects/${params.subjectId}/video/${videoId}`);
  };

  if (loading || !subject || !currentVideo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  // Get previous and next videos
  const allVideos = subject.sections.flatMap((s: any) => s.videos);
  const currentIndex = allVideos.findIndex((v: any) => v.id === currentVideo.id);
  const prevVideo = allVideos[currentIndex - 1];
  const nextVideo = allVideos[currentIndex + 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          sections={subject.sections} 
          currentVideoId={currentVideo.id}
          subjectId={subject.id as string}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <VideoPlayer
              videoId={currentVideo.id}
              youtubeUrl={currentVideo.youtube_url}
              initialPosition={currentVideo.last_position_seconds}
              onProgressSave={handleProgressSave}
            />
            
            <h1 className="text-2xl font-bold mt-6 mb-2">{currentVideo.title}</h1>
            {currentVideo.description && (
              <p className="text-gray-600 mb-6">{currentVideo.description}</p>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={() => prevVideo && !prevVideo.locked && navigateToVideo(prevVideo.id)}
                disabled={!prevVideo || prevVideo.locked}
                className="flex items-center px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>
              <button
                onClick={() => nextVideo && !nextVideo.locked && navigateToVideo(nextVideo.id)}
                disabled={!nextVideo || nextVideo.locked}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Video {
  id: string;
  title: string;
  order_index: number;
  locked: boolean;
  completed: boolean;
  last_position_seconds: number;
}

interface Section {
  id: string;
  title: string;
  order_index: number;
  videos: Video[];
}

interface SidebarProps {
  sections: Section[];
  currentVideoId?: string;
  subjectId: string;
}

export default function Sidebar({ sections, currentVideoId, subjectId }: SidebarProps) {
  const router = useRouter();

  const handleVideoClick = (video: Video) => {
    if (!video.locked) {
      router.push(`/subjects/${subjectId}/video/${video.id}`);
    }
  };

  return (
    <div className="w-80 bg-white border-r h-full overflow-y-auto shadow-lg">
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 w-1 h-6 mr-2 rounded"></span>
          Course Content
        </h2>
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide px-2">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                    video.locked
                      ? 'bg-gray-50 cursor-not-allowed opacity-60'
                      : currentVideoId === video.id
                      ? 'bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-500 shadow-sm'
                      : 'bg-gray-50 hover:bg-pink-50 hover:shadow-md'
                  }`}
                  disabled={video.locked}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex-shrink-0">
                      {video.locked ? (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-gray-500" />
                        </div>
                      ) : video.completed ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : currentVideoId === video.id ? (
                        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                          <PlayCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-pink-300 transition-colors">
                          <PlayCircle className="w-4 h-4 text-gray-600 group-hover:text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          video.locked ? 'text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        <span className="text-gray-500 mr-1">{video.order_index}.</span>
                        {video.title}
                      </p>
                      {!video.locked && video.last_position_seconds > 0 && !video.completed && (
                        <p className="text-xs text-pink-600 mt-1 font-medium">
                          {Math.floor(video.last_position_seconds / 60)}m{' '}
                          {video.last_position_seconds % 60}s watched
                        </p>
                      )}
                      {video.completed && (
                        <p className="text-xs text-green-600 mt-1 font-medium flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

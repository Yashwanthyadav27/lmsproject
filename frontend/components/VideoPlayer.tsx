'use client';

import YouTube, { YouTubeProps } from 'react-youtube';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';

interface VideoPlayerProps {
  videoId: string;
  youtubeUrl: string;
  initialPosition?: number;
  onProgressSave: (position: number, completed: boolean) => void;
}

export default function VideoPlayer({
  videoId,
  youtubeUrl,
  initialPosition = 0,
  onProgressSave,
}: VideoPlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [lastSavedPosition, setLastSavedPosition] = useState(initialPosition);
  const [isCompleted, setIsCompleted] = useState(false);

  // Extract YouTube video ID from URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))( [\w-]+)/);
    return match ? match[1].trim() : url.split('/').pop();
  };

  const youtubeVideoId = getVideoId(youtubeUrl);

  const onReady = (event: YouTubeProps['onReady']) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);

    // Resume from last position if available
    if (initialPosition > 0) {
      playerInstance.seekTo(initialPosition, true);
    }
  };

  const onStateChange = (event: YouTubeProps['onStateChange']) => {
    // Video ended
    if (event.data === 0) {
      setIsCompleted(true);
      onProgressSave(player.getDuration(), true);
    }
  };

  // Save progress every 10 seconds
  useEffect(() => {
    if (!player) return;

    const saveProgressInterval = setInterval(() => {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();

      // Mark as completed if watched 90% of video
      const is90PercentWatched = currentTime >= duration * 0.9;

      if (currentTime - lastSavedPosition >= 10 || is90PercentWatched) {
        setLastSavedPosition(currentTime);
        onProgressSave(currentTime, is90PercentWatched);

        if (is90PercentWatched && !isCompleted) {
          setIsCompleted(true);
        }
      }
    }, 10000);

    return () => clearInterval(saveProgressInterval);
  }, [player, lastSavedPosition, onProgressSave, isCompleted]);

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <YouTube
        videoId={youtubeVideoId}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        className="w-full h-full"
      />
    </div>
  );
}

import { create } from 'zustand';

interface Video {
  id: string;
  title: string;
  description: string | null;
  youtube_url: string;
  order_index: number;
  duration_seconds: number | null;
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

interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  sections: Section[];
}

interface VideoState {
  currentSubject: Subject | null;
  currentVideo: Video | null;
  setCurrentSubject: (subject: Subject) => void;
  setCurrentVideo: (video: Video) => void;
  updateVideoProgress: (videoId: string, position: number, completed: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentSubject: null,
  currentVideo: null,

  setCurrentSubject: (subject) => set({ currentSubject: subject }),

  setCurrentVideo: (video) => set({ currentVideo: video }),

  updateVideoProgress: (videoId, position, completed) => {
    set((state) => {
      if (!state.currentSubject) return state;

      const updatedSections = state.currentSubject.sections.map((section) => ({
        ...section,
        videos: section.videos.map((video) => {
          if (video.id === videoId) {
            return {
              ...video,
              last_position_seconds: position,
              completed,
            };
          }
          return video;
        }),
      }));

      return {
        currentSubject: {
          ...state.currentSubject,
          sections: updatedSections,
        },
      };
    });
  },
}));

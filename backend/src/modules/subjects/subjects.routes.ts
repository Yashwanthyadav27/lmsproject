import { Router } from 'express';
import prisma from '../../config/db';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

const router = Router();

// GET /api/subjects - List all published subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { is_published: true },
      orderBy: { created_at: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        _count: {
          select: { sections: true },
        },
      },
    });

    res.json(subjects);
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// GET /api/subjects/:subjectId - Get subject details
router.get('/:subjectId', async (req, res) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: req.params.subjectId },
      include: {
        sections: {
          orderBy: { order_index: 'asc' },
          include: {
            videos: {
              orderBy: { order_index: 'asc' },
              select: {
                id: true,
                title: true,
                description: true,
                youtube_url: true,
                order_index: true,
                duration_seconds: true,
              },
            },
          },
        },
      },
    });

    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    res.json(subject);
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
});

// GET /api/subjects/:subjectId/tree - Get course tree with lock status
router.get('/:subjectId/tree', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: req.params.subjectId },
      include: {
        sections: {
          orderBy: { order_index: 'asc' },
          include: {
            videos: {
              orderBy: { order_index: 'asc' },
              select: {
                id: true,
                title: true,
                description: true,
                youtube_url: true,
                order_index: true,
                duration_seconds: true,
                section_id: true,
              },
            },
          },
        },
      },
    });

    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    // Get user's progress for all videos in this subject
    const videoIds = subject.sections.flatMap((section) =>
      section.videos.map((video) => video.id)
    );

    const progressRecords = await prisma.videoProgress.findMany({
      where: {
        user_id: req.user!.userId,
        video_id: { in: videoIds },
      },
      select: {
        video_id: true,
        is_completed: true,
        last_position_seconds: true,
      },
    });

    const progressMap = new Map(progressRecords.map((p) => [p.video_id, p]));

    // Add locked and progress status to each video
    const sectionsWithVideos = subject.sections.map((section) => ({
      ...section,
      videos: section.videos.map((video, index) => {
        const progress = progressMap.get(video.id);
        const isCompleted = progress?.is_completed || false;
        
        // Video is locked if it's not the first video and previous video is not completed
        let isLocked = false;
        if (index > 0) {
          const previousVideo = section.videos[index - 1];
          const previousProgress = progressMap.get(previousVideo.id);
          isLocked = !previousProgress?.is_completed;
        }

        return {
          ...video,
          locked: isLocked,
          completed: isCompleted,
          last_position_seconds: progress?.last_position_seconds || 0,
        };
      }),
    }));

    res.json({
      ...subject,
      sections: sectionsWithVideos,
    });
  } catch (error) {
    console.error('Get subject tree error:', error);
    res.status(500).json({ error: 'Failed to fetch course tree' });
  }
});

export default router;

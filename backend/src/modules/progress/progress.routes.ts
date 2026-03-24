import { Router } from 'express';
import prisma from '../../config/db';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

const router = Router();

// GET /api/progress/videos/:videoId - Get progress for a specific video
router.get('/videos/:videoId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user!.userId;

    const progress = await prisma.videoProgress.findUnique({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
    });

    if (!progress) {
      res.json({
        last_position_seconds: 0,
        is_completed: false,
      });
      return;
    }

    res.json({
      last_position_seconds: progress.last_position_seconds,
      is_completed: progress.is_completed,
      completed_at: progress.completed_at,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/progress/videos/:videoId - Save/update progress for a video
router.post('/videos/:videoId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user!.userId;
    const { last_position_seconds, is_completed } = req.body;

    // Validate input
    if (typeof last_position_seconds !== 'number' || last_position_seconds < 0) {
      res.status(400).json({ error: 'Invalid position value' });
      return;
    }

    // Upsert progress record
    const progress = await prisma.videoProgress.upsert({
      where: {
        user_id_video_id: {
          user_id: userId,
          video_id: videoId,
        },
      },
      update: {
        last_position_seconds,
        is_completed: is_completed === true,
        completed_at: is_completed === true ? new Date() : null,
      },
      create: {
        user_id: userId,
        video_id: videoId,
        last_position_seconds,
        is_completed: is_completed === true,
        completed_at: is_completed === true ? new Date() : null,
      },
    });

    res.json({
      message: 'Progress saved successfully',
      progress: {
        last_position_seconds: progress.last_position_seconds,
        is_completed: progress.is_completed,
        completed_at: progress.completed_at,
      },
    });
  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

export default router;

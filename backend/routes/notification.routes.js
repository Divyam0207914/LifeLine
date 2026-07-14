import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getNotifications);
router.put('/mark-read/:id', authMiddleware, markAsRead);
router.put('/mark-all-read', authMiddleware, markAllAsRead);

export default router;

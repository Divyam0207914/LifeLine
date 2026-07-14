import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getReceivedRequests, updateRequestStatus } from '../controllers/requestLog.controller.js';

const router = express.Router();

router.get('/received-requests', authMiddleware , getReceivedRequests); 
router.put('/update-status/:id', authMiddleware, updateRequestStatus);

export default router;

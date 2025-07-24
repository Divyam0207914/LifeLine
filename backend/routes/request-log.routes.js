import express from 'express';
import { authMiddleware } from '../middelwares/auth.middelware.js';
import { getReceivedRequests } from '../controllers/requestLog.controller.js';

const router = express.Router();

router.get('/received-requests', authMiddleware , getReceivedRequests); 

export default router;

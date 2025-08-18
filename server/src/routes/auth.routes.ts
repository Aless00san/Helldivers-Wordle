import { Router } from 'express';
import {
  getCurrentUser,
  redirectToDiscordAuth,
  handleDiscordCallback,
  logout,
} from '../controllers/auth.controller';
import cors from 'cors';

const router = Router();
router.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

export default router;

router.get('/discord', redirectToDiscordAuth);
router.get('/discord/callback', handleDiscordCallback);
router.get('/discord/logout', logout);
router.get('/discord/user', getCurrentUser);

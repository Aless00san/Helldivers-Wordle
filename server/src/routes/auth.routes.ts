import { Router } from 'express';
import {
  getCurrentUser,
  redirectToDiscordAuth,
  handleDiscordCallback,
  logout,
  refreshToken,
} from '../controllers/auth.controller';
import cors from 'cors';

const router = Router();
router.use(
  cors({
    origin: 'http://gg.helldive.site',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

export default router;

router.get('/discord', redirectToDiscordAuth);
router.get('/discord/callback', handleDiscordCallback);
router.post('/discord/refresh', refreshToken);
router.get('/discord/logout', logout);
router.get('/discord/user', getCurrentUser);

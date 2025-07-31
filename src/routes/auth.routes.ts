import { Router } from 'express';
import {
  getCurrentUser,
  redirectToDiscordAuth,
  handleDiscordCallback,
  logout,
} from '../controllers/auth.controller';

const router = Router();

export default router;

router.get('/discord', redirectToDiscordAuth);
router.get('/discord/callback', handleDiscordCallback);
router.get('/discord/logout', logout);
router.get('/discord/user', getCurrentUser);

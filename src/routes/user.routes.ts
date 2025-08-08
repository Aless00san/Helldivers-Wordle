import { Router } from 'express';
import { create, getByDiscordId } from '../controllers/user.controller';

const router = Router();

export default router;

router.post('/create', create);

router.get('/discord/:id', getByDiscordId);

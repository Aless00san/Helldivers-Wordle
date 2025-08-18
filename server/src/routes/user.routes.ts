import { Router } from 'express';
import { create, getByDiscordId } from '../controllers/user.controller';
import cors from 'cors';

const router = Router();
router.use(cors({
    origin: 'http://localhost:5173',
}));

export default router;

router.post('/create', create);

router.get('/discord/:id', getByDiscordId);

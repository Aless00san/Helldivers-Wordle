import { Router } from 'express';
import { getAllStratagems } from '../controllers/stratagem.controller';
import { getStratagemById } from '../controllers/stratagem.controller';
import { createStratagem } from '../controllers/stratagem.controller';
import { deleteStratagem } from '../controllers/stratagem.controller';
import { updateStratagem } from '../controllers/stratagem.controller';
import { getDailyStratagem } from '../controllers/stratagem.controller';

import { keyAuth } from '../middleware/KeyAuth';

const router = Router();

router.get('/stratagems', getAllStratagems);

router.get('/stratagems/daily', getDailyStratagem);

router.get('/stratagems/:id', getStratagemById);

router.post('/stratagems', keyAuth, createStratagem);

router.put('/stratagems/:id', keyAuth, updateStratagem);

router.delete('/stratagems/:id', keyAuth, deleteStratagem);

export default router;

import { Router } from 'express';
import { guessAttempt } from '../controllers/game.controller';

const router = Router();

export default router;

//Should return an array of individual guesses
//Each position can be correct, wrong position, or incorrect
//Frontend then should use the array to correctly display the guesses
router.post('/guess', guessAttempt);

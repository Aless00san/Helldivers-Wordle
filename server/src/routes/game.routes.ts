import { Router } from 'express';
import { guessAttempt, create, update } from '../controllers/game.controller';

const router = Router();

export default router;

//Returns an array of guesses and a new status of game after guess attempt
// Either "win", "lose", or "continue"
//Frontend then should use the data to correctly display the game
router.post('/guess', guessAttempt);

router.post('/guess/create', create);

router.post('/guess/update', update);

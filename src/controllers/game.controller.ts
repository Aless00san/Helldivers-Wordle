import { validateGuesses } from '../services/game.service';
import { Request, Response } from 'express';

export const guessAttempt = async (req: Request, res: Response) => {
  const validatedGuesses = await validateGuesses(
    ['b', 'c', 'x'],
    ['a', 'c', 'b']
  );
  res.json(validatedGuesses);
};

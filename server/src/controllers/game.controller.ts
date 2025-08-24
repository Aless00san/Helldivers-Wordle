import {
  evaluateGameStatus,
  updateGameStatus,
  createGame,
  getGameByUserToday,
  getUserGameHistory,
} from '../services/game.service';
import {
  getCurrentUser,
  getUserFromRequest,
} from '../controllers/auth.controller';
import { Request, Response } from 'express';

export const guessAttempt = async (req: Request, res: Response) => {
  const { guess, solution } = req.body;
  const validatedGuesses = await evaluateGameStatus(guess, solution, 1, 5);
  res.json(validatedGuesses);
};

export const update = async (req: Request, res: Response) => {
  const { gameId, status } = req.body;
  const updatedGame = await updateGameStatus(gameId, status);
  res.json(updatedGame);
};

export const create = async (req: Request, res: Response) => {
  try {
    const { stratagemId } = req.body;
    const game = await createGame(stratagemId, req); // pass req to get user from cookie
    res.json(game);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const checkExistingGame = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);
    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: 'ERROR',
        message: 'User not found or access token missing.',
      });
    }

    const game = await getGameByUserToday(user.id);

    if (game) {
      return res.json({
        status: 'SUCCESS',
        message: 'Game already exists for today.',
        game,
      });
    } else {
      return res.json({
        status: 'SUCCESS',
        message: 'No game found for today.',
        game: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Internal server error.',
    });
  }
};

export const getGameHistory = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const games = await getUserGameHistory(userId, page, pageSize);
  res.json(games);
};

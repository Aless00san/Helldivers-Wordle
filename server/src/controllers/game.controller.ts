import {
  evaluateGameStatus,
  updateGameStatus,
  createGame,
} from "../services/game.service";
import { Request, Response } from "express";

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
  const { stratagemId, userId } = req.body;
  const game = await createGame(stratagemId, userId);
  res.json(game);
};

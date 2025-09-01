import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '../controllers/auth.controller';
import { Request } from 'express';
import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

type GameStatus = 'WON' | 'LOST' | 'IN_PROGRESS';
type FeedbackType = 'correct' | 'misplaced' | 'wrong';

// Receives an array of guesses, the answer, and the attempts number
// Compares each guess to the solution
// Generates a new array with [correct, misplaced, wrong]
// Returns win, lose, or continue accordingly
export const evaluateGameStatus = (
  guesses: string[],
  answer: string[],
  attempt: number,
  maxAttempts: number
): { guesses: FeedbackType[]; status: GameStatus } => {
  const newGuesses: FeedbackType[] = new Array(guesses.length).fill('wrong');
  const answerCounts: { [key: string]: number } = {};

  // First pass: mark correct and build counts of unmatched letters
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i] === answer[i]) {
      newGuesses[i] = 'correct';
    } else {
      // Count only unmatched letters
      answerCounts[answer[i]] = (answerCounts[answer[i]] || 0) + 1;
    }
  }

  // Second pass: check for misplaced
  for (let i = 0; i < guesses.length; i++) {
    if (newGuesses[i] === 'wrong') {
      const guessChar = guesses[i];
      if (answerCounts[guessChar] && answerCounts[guessChar] > 0) {
        newGuesses[i] = 'misplaced';
        answerCounts[guessChar]--;
      }
    }
  }

  const isWin = newGuesses.every(g => g === 'correct');
  const isFinalAttempt = attempt >= maxAttempts - 1;

  return {
    guesses: newGuesses,
    status: isWin ? 'WON' : isFinalAttempt ? 'LOST' : 'IN_PROGRESS',
  };
};

export const createGame = async (stratagemId: string, req: Request) => {
  const user = await getUserFromRequest(req);

  if (!user) throw new Error('User not authenticated');

  const existingGame = await getGameByUserToday(user.id);
  if (existingGame) return existingGame;

  const game = await prisma.game.create({
    data: {
      stratagem: { connect: { id: stratagemId } },
      user: { connect: { id: user.id } }, // guaranteed to exist
      status: 'IN_PROGRESS',
    },
  });

  return game;
};

export const updateGameStatus = async (gameId: string, status: GameStatus) => {
  const result = await prisma.game.updateMany({
    where: {
      id: gameId,
      status: 'IN_PROGRESS',
    },
    data: { status },
  });

  if (result.count === 0) {
    return {
      status: 'FAILED',
      message: 'Game not found or not in progress',
    };
  }

  return prisma.game.findUnique({ where: { id: gameId } });
};

export const getGameByUserToday = async (userId: number) => {
  const now = new Date();
  const startOfToday = startOfDay(now); // still local by default
  const endOfToday = endOfDay(now);

  const game = await prisma.game.findFirst({
    where: {
      userId,
      createdAt: {
        gte: startOfToday.toISOString(), // force UTC
        lte: endOfToday.toISOString(),
      },
    },
    include: { user: true },
  });

  return game;
};

// For retrieving a game history for a given user
// PARAMS: page, pageSize
// RETURNS: games, pagination info
export const getUserGameHistory = async (
  userId: number,
  page: number,
  pageSize: number
) => {
  const games = await prisma.game.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.game.count({ where: { userId } });

  return {
    games,
    pagination: {
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    },
  };
};

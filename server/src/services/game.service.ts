import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type GameStatus = 'win' | 'lose' | 'continue';
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
    status: isWin ? 'win' : isFinalAttempt ? 'lose' : 'continue',
  };
};



export const createGame = async (stratagemId: string, userId?: number) => {
  const game = await prisma.game.create({
    data: {
      stratagem: { connect: { id: stratagemId } },
      ...(userId && { user: { connect: { id: userId } } }),
      won: false,
      status: 'IN_PROGRESS',
    },
  });

  return game;
};

export const updateGameStatus = async (gameId: string, status: GameStatus) => {
  const game = await prisma.game.update({
    where: { id: gameId },
    data: { status, won: status === 'win' },
  });

  return game;
};

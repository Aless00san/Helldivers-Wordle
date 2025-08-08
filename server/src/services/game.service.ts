import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type GameStatus = 'win' | 'lose' | 'continue';

//recieves an array of guesses, the answer, and the attempts number
//compares each guess to the solution [TODO: Store solution]
//generates a new array with [correct, misplaced, wrong]
//returns win, lose, or continue accordingly
export const evaluateGameStatus = (
  guesses: string[],
  answer: string[],
  attempt: number,
  maxAttempts: number
): {} => {
  let newGuesses = [];

  for (let i = 0; i < guesses.length; i++) {
    let guess = guesses[i];
    let solution = answer[i];

    if (guess === solution) {
      newGuesses.push('correct');
    } else if (guess != solution && answer.includes(guess)) {
      newGuesses.push('misplaced');
    } else {
      newGuesses.push('wrong');
    }
  }

  const isWin = newGuesses.every(g => g === 'correct');
  const isFinalAttempt = attempt >= maxAttempts;

  // Construct a JSON object with the new guesses and the status
  const gameStatus = {
    guesses: newGuesses,
    status: isWin ? 'win' : isFinalAttempt ? 'lose' : 'continue',
  };

  return gameStatus;
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

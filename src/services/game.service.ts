import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//recieves an array of guesses
//compares each guess to the solution TODO: Store solution
//generates a new array with [correct, misplaced, wrong]
export const validateGuesses = async (guesses: string[], answer: string[]) => {
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
  return newGuesses;
};

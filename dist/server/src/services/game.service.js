"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameStatus = exports.createGame = exports.evaluateGameStatus = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//recieves an array of guesses, the answer, and the attempts number
//compares each guess to the solution [TODO: Store solution]
//generates a new array with [correct, misplaced, wrong]
//returns win, lose, or continue accordingly
const evaluateGameStatus = (guesses, answer, attempt, maxAttempts) => {
    let newGuesses = [];
    for (let i = 0; i < guesses.length; i++) {
        let guess = guesses[i];
        let solution = answer[i];
        if (guess === solution) {
            newGuesses.push('correct');
        }
        else if (guess != solution && answer.includes(guess)) {
            newGuesses.push('misplaced');
        }
        else {
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
exports.evaluateGameStatus = evaluateGameStatus;
const createGame = async (stratagemId, userId) => {
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
exports.createGame = createGame;
const updateGameStatus = async (gameId, status) => {
    const game = await prisma.game.update({
        where: { id: gameId },
        data: { status, won: status === 'win' },
    });
    return game;
};
exports.updateGameStatus = updateGameStatus;

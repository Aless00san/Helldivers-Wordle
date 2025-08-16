"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.update = exports.guessAttempt = void 0;
const game_service_1 = require("../services/game.service");
const guessAttempt = async (req, res) => {
    const { guess, solution } = req.body;
    const validatedGuesses = await (0, game_service_1.evaluateGameStatus)(guess, solution, 1, 5);
    res.json(validatedGuesses);
};
exports.guessAttempt = guessAttempt;
const update = async (req, res) => {
    const { gameId, status } = req.body;
    const updatedGame = await (0, game_service_1.updateGameStatus)(gameId, status);
    res.json(updatedGame);
};
exports.update = update;
const create = async (req, res) => {
    const { stratagemId, userId } = req.body;
    const game = await (0, game_service_1.createGame)(stratagemId, userId);
    res.json(game);
};
exports.create = create;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const game_controller_1 = require("../controllers/game.controller");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
exports.default = router;
//Returns an array of guesses and a new status of game after guess attempt
//Either "win", "lose", or "continue"
//Frontend then should use the data to correctly display the game
router.post('/guess', game_controller_1.guessAttempt);
router.post('/guess/create', game_controller_1.create);
router.post('/guess/update', game_controller_1.update);

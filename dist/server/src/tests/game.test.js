"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_service_1 = require("../services/game.service");
describe('evaluateGameStatus', () => {
    it('returns "win" when all letters are correct', () => {
        const result = (0, game_service_1.evaluateGameStatus)(['c', 'a', 't'], ['c', 'a', 't'], 1, 6);
        expect(result).toBe('win');
    });
    it('returns "lose" on final incorrect attempt', () => {
        const result = (0, game_service_1.evaluateGameStatus)(['d', 'o', 'g'], ['c', 'a', 't'], 6, 6);
        expect(result).toBe('lose');
    });
    it('returns "win" on final correct attempt', () => {
        const result = (0, game_service_1.evaluateGameStatus)(['d', 'o', 'g'], ['d', 'o', 'g'], 6, 6);
        expect(result).toBe('win');
    });
    it('returns "continue" on a wrong guess before max attempts', () => {
        const result = (0, game_service_1.evaluateGameStatus)(['d', 'o', 'g'], ['c', 'a', 't'], 2, 6);
        expect(result).toBe('continue');
    });
});

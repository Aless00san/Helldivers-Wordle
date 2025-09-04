import { evaluateGameStatus } from '../services/game.service';

describe('evaluateGameStatus', () => {
  it('returns "WON" when all letters are correct', () => {
    const result = evaluateGameStatus(['c', 'a', 't'], ['c', 'a', 't'], 1, 6);
    expect(result.status).toBe('WON');
  });

  it('returns "LOST" on final incorrect attempt', () => {
    const result = evaluateGameStatus(['d', 'o', 'g'], ['c', 'a', 't'], 6, 6);
    expect(result.status).toBe('LOST');
  });

  it('returns "WON" on final correct attempt', () => {
    const result = evaluateGameStatus(['d', 'o', 'g'], ['d', 'o', 'g'], 6, 6);
    expect(result.status).toBe('WON');
  });

  it('returns "IN_PROGRESS" on a wrong guess before max attempts', () => {
    const result = evaluateGameStatus(['d', 'o', 'g'], ['c', 'a', 't'], 2, 6);
    expect(result.status).toBe('IN_PROGRESS');
  });
});

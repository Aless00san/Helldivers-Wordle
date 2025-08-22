// types.ts
export type GameStatus = "IN_PROGRESS" | "WON" | "LOST" | "DRAW" | "ABANDONED";

export interface Game {
  id: string;
  createdAt: Date;
  stratagemId: string;
  status: GameStatus;
  userId?: number;
}
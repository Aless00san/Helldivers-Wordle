// types.ts
export type GameStatus = "IN_PROGRESS" | "WON" | "LOST" | "DRAW" | "ABANDONED";

export interface Game {
  id: string;
  createdAt: Date;
  stratagemId: string;
  status: GameStatus;
  userId?: number;
}

export interface Stratagem {
  id: string;
  name: string;
  code: string[];
  category: string;
  enabled: boolean;
  createdAt: Date;
}
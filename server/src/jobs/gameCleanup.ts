import cron from "node-cron";
import { PrismaClient, GameStatus } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Marks all games that are IN_PROGRESS from previous days as ABANDONED.
 * @returns number of games updated
 */
export async function cleanupOldGames(): Promise<number> {
  const updatedGames = await prisma.game.updateMany({
    where: {
      status: GameStatus.IN_PROGRESS,
      createdAt: { lt: new Date(new Date().setHours(0, 0, 0, 0)) }, // before today
    },
    data: { status: GameStatus.ABANDONED },
  });

  return updatedGames.count;
}

/**
 * This will start the cron job every day
 * at 00:00 UTC
 */
export function startGameCleanupJob(): void {
  cron.schedule("00 00 * * *", async () => {
    try {
      const count = await cleanupOldGames();
      console.log(`[${new Date().toISOString()}] Marked ${count} old games as ABANDONED.`);
    } catch (err: unknown) {
      console.error("Error running game cleanup:", err);
    }
  });
}

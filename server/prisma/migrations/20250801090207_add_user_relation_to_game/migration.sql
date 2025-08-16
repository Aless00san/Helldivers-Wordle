/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stratagemId" TEXT NOT NULL,
    "guesses" JSONB NOT NULL,
    "won" BOOLEAN NOT NULL,
    "numGuesses" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "userId" INTEGER,
    CONSTRAINT "Game_stratagemId_fkey" FOREIGN KEY ("stratagemId") REFERENCES "Stratagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("createdAt", "guesses", "id", "numGuesses", "stratagemId", "won") SELECT "createdAt", "guesses", "id", "numGuesses", "stratagemId", "won" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_userId_createdAt_key" ON "Game"("userId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

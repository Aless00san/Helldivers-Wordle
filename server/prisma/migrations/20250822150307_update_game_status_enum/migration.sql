/*
  Warnings:

  - You are about to drop the column `won` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stratagemId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "userId" INTEGER,
    CONSTRAINT "Game_stratagemId_fkey" FOREIGN KEY ("stratagemId") REFERENCES "Stratagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("createdAt", "id", "status", "stratagemId", "userId") SELECT "createdAt", "id", "status", "stratagemId", "userId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_userId_createdAt_key" ON "Game"("userId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

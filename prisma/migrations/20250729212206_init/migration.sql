-- CreateTable
CREATE TABLE "Stratagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stratagemId" TEXT NOT NULL,
    "guesses" JSONB NOT NULL,
    "won" BOOLEAN NOT NULL,
    "numGuesses" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_stratagemId_fkey" FOREIGN KEY ("stratagemId") REFERENCES "Stratagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

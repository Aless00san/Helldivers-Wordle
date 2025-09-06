/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Stratagem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stratagem_name_key" ON "Stratagem"("name");

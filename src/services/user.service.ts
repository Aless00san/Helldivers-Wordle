import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  return prisma.user.create({
    data,
  });
};

export const getUserByDiscordId = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      discordId: id,
    },
  });
};

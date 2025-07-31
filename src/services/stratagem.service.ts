import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

export const stratagemService = {
  getAll: async () => {
    return prisma.stratagem.findMany();
  },
  getById: async (id: string) => {
    return prisma.stratagem.findUnique({
      where: {
        id,
      },
    });
  },
  create: async (data: any) => {
    return prisma.stratagem.create({
      data,
    });
  },
  update: async (id: string, data: any) => {
    return prisma.stratagem.update({
      where: {
        id,
      },
      data,
    });
  },
  delete: async (id: string) => {
    return prisma.stratagem.delete({
      where: {
        id,
      },
    });
  },
  getDaily: async () => {
    let all = await stratagemService.getAll();

    let today = new Date().toISOString().slice(0, 10);
    let hash = createHash('sha256').update(today).digest('hex');
    let slicedHash = hash.slice(0, 8);
    let size = all.length;
    let index = parseInt(slicedHash, 16) % size;
    return all[index];
  },
};

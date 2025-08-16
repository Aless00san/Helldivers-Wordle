"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stratagemService = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
exports.stratagemService = {
    getAll: async () => {
        return prisma.stratagem.findMany();
    },
    getById: async (id) => {
        return prisma.stratagem.findUnique({
            where: {
                id,
            },
        });
    },
    create: async (data) => {
        return prisma.stratagem.create({
            data,
        });
    },
    update: async (id, data) => {
        return prisma.stratagem.update({
            where: {
                id,
            },
            data,
        });
    },
    delete: async (id) => {
        return prisma.stratagem.delete({
            where: {
                id,
            },
        });
    },
    getDaily: async () => {
        let all = await exports.stratagemService.getAll();
        let today = new Date().toISOString().slice(0, 10);
        let hash = (0, crypto_1.createHash)('sha256').update(today).digest('hex');
        let slicedHash = hash.slice(0, 8);
        let size = all.length;
        let index = parseInt(slicedHash, 16) % size;
        return all[index];
    },
};

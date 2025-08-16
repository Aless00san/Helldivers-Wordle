"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByDiscordId = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (data) => {
    return prisma.user.create({
        data,
    });
};
exports.createUser = createUser;
const getUserByDiscordId = async (id) => {
    return prisma.user.findUnique({
        where: {
            discordId: id,
        },
    });
};
exports.getUserByDiscordId = getUserByDiscordId;

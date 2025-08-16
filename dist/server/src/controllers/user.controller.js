"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByDiscordId = exports.create = void 0;
const user_service_1 = require("../services/user.service");
const create = async (req, res) => {
    const { name, email, discordId } = req.body;
    const user = await (0, user_service_1.createUser)({ name, email, discordId });
    res.json(user);
};
exports.create = create;
const getByDiscordId = async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.getUserByDiscordId)(id);
    res.json(user);
};
exports.getByDiscordId = getByDiscordId;

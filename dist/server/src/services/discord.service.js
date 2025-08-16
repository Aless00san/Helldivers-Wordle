"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromCode = getTokenFromCode;
exports.getUser = getUser;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
async function getTokenFromCode(retrievedCode) {
    const data = {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: retrievedCode,
        redirect_uri: 'http://localhost:3000/auth/discord/callback',
        scope: 'identify',
    };
    try {
        const res = await axios_1.default.post('https://discord.com/api/oauth2/token', qs_1.default.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return res.data; // ACCES TOKEN
    }
    catch (err) {
        console.error('Failed to exchange code for token:', err);
        return null;
    }
}
async function getUser(token) {
    if (!token) {
        console.error('Access token is missing.');
        return null;
    }
    try {
        const res = await axios_1.default.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }
    catch (err) {
        console.error('Failed to get current user:', err);
        return null;
    }
}

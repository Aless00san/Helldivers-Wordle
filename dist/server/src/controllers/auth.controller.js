"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.refreshToken = exports.handleDiscordCallback = exports.redirectToDiscordAuth = void 0;
const discord_service_1 = require("../services/discord.service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const redirectToDiscordAuth = async (req, res) => {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=1400113678044364820&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email`);
};
exports.redirectToDiscordAuth = redirectToDiscordAuth;
//Grabs the code from the request and exchanges it for a token
//Then stores the token in the user's session and retrieves the user's info
const handleDiscordCallback = async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('Missing code from Discord callback.');
    }
    try {
        const token = await (0, discord_service_1.getTokenFromCode)(code);
        if (!token) {
            return res.status(400).send('Failed to retrieve token from code.');
        }
        //acces token
        res.cookie('access_token', token.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600 * 1000, // 1 hour
            path: '/',
        });
        //refresh token
        res.cookie('refresh_token', token.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 * 4, // 4 weeks
            path: '/auth/refresh',
        });
        //retrieve user
        const user = await (0, discord_service_1.getUser)(token.access_token);
        //check if user exists in DB
        const userExists = await prisma.user.findFirst({
            where: {
                discordId: user.id,
            },
        });
        //If user doesn't exist, create them
        if (!userExists) {
            await prisma.user.create({
                data: {
                    name: user.username,
                    email: user.email,
                    discordId: user.id,
                },
            });
        }
        else {
            console.log('User exists in DB');
        }
        res.json({
            status: 'SUCCESS',
            message: 'Successfully authenticated with Discord.',
            user: user,
        });
    }
    catch (err) {
        console.error('Error getting token from code:', err);
        res.status(500).send('Error retrieving token from code.');
    }
};
exports.handleDiscordCallback = handleDiscordCallback;
//Todo: refresh token
//Send a POST request to https://discord.com/api/oauth2/token
// Exchange the refresh token for a new access token
const refreshToken = async (req, res) => { };
exports.refreshToken = refreshToken;
//Sends a GET request to: https://discord.com/api/users/@me
//Retrieves the user's database entry
const getCurrentUser = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.access_token) {
            return res.json({ status: 'ERROR', message: 'Access token is missing.' });
        }
        const user = await (0, discord_service_1.getUser)(req.cookies.access_token);
        const id = user.id;
        const userExists = await prisma.user.findFirst({
            where: {
                discordId: id,
            },
        });
        if (!userExists) {
            return res.json({
                status: 'ERROR',
                message: 'User does not exist in DB.',
            });
        }
        else {
            return res.json({
                status: 'SUCCESS',
                message: 'User exists in DB.',
                user: userExists,
            });
        }
    }
    catch (err) {
        return res.json({
            status: 'ERROR',
            message: 'Error retrieving current user.',
        });
    }
};
exports.getCurrentUser = getCurrentUser;
const logout = async (req, res) => {
    //clear the acces_token
    res.cookie('access_token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    });
    res.status(200).send('Successfully logged out.');
};
exports.logout = logout;

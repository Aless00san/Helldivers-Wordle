"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenPayload = createTokenPayload;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jose_1 = require("jose");
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
function createTokenPayload({ name, discordId }) {
    const now = Math.floor(Date.now() / 1000);
    return {
        sub: discordId,
        name,
        iat: now,
        exp: now + 60 * 60 * 24 * 7, // 7 days
    };
}
async function createToken(payload) {
    const token = await new jose_1.SignJWT(payload)
        .setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT',
    })
        .sign(secret);
    return token;
}
async function verifyToken(token) {
    try {
        const { payload } = await (0, jose_1.jwtVerify)(token, secret);
        return payload;
    }
    catch (error) {
        return null;
    }
}

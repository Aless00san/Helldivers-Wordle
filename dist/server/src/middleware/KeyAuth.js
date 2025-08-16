"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyAuth = keyAuth;
function keyAuth(req, res, next) {
    const api_key = req.header('x-api-key');
    if (api_key && api_key == process.env.ADMIN_API_KEY) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

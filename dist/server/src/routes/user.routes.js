"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
exports.default = router;
router.post('/create', user_controller_1.create);
router.get('/discord/:id', user_controller_1.getByDiscordId);

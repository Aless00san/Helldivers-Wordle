"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stratagem_routes_1 = __importDefault(require("./routes/stratagem.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const game_routes_1 = __importDefault(require("./routes/game.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', stratagem_routes_1.default); // mount stratagem routes at /api
app.use('/auth', auth_routes_1.default); //mount auth routes at /auth
app.use('/game', game_routes_1.default); //mount game routes at /game
app.use('/user', user_routes_1.default); //mount user routes at /user
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

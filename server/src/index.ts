import express from 'express';
import stratagemRoutes from './routes/stratagem.routes';
import authRoutes from './routes/auth.routes';
import gameRoutes from './routes/game.routes';
import userRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import { startGameCleanupJob } from './jobs/gameCleanup';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Middleware para confiar en proxy
app.set('trust proxy', true);

startGameCleanupJob(); // start the game cleanup job automatically

app.use(express.json());
app.use(cookieParser());
app.use('/api', stratagemRoutes); // mount stratagem routes at /api
app.use('/auth', authRoutes); //mount auth routes at /auth
app.use('/game', gameRoutes); //mount game routes at /game
app.use('/user', userRoutes); //mount user routes at /user

app.listen(port, () => {
  console.log(`Server running at http://gg.helldive.site:${port}`);
});

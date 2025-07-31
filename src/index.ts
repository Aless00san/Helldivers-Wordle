import express from 'express';
import stratagemRoutes from './routes/stratagem.routes';
import authRoutes from './routes/auth.routes';
import gameRoutes from './routes/game.routes';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', stratagemRoutes); // mount stratagem routes at /api
app.use('/auth', authRoutes); //mount auth routes at /auth
app.use('/game', gameRoutes); //mount game routes at /game

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

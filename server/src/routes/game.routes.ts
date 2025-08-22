import { Router } from "express";
import cors from "cors";

import { guessAttempt, create, update, checkExistingGame, getGameHistory} from "../controllers/game.controller";

const router = Router();
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
export default router;

//Returns an array of guesses and a new status of game after guess attempt
//Either "win", "lose", or "continue"
//Frontend then should use the data to correctly display the game
router.post("/guess", guessAttempt);

router.post("/guess/create", create);

router.post("/guess/update", update);

router.get("/today", checkExistingGame);

router.get("/history", getGameHistory);

import { Request, Response } from 'express';
import { getUserByDiscordId, createUser } from '../services/user.service';

export const create = async (req: Request, res: Response) => {
  const { name, email, discordId } = req.body;
  const user = await createUser({ name, email, discordId });
  res.json(user);
};

export const getByDiscordId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByDiscordId(id);
  res.json(user);
};

import { Request, Response } from 'express';
import { stratagemService } from '../services/stratagem.service';

export async function getAllStratagems(req: Request, res: Response) {
  const stratagems = await stratagemService.getAll();
  res.json(stratagems);
}

export async function getStratagemById(req: Request, res: Response) {
  const { id } = req.params;
  const stratagem = await stratagemService.getById(id);
  res.json(stratagem);
}

export async function createStratagem(req: Request, res: Response) {
  const { name, code, category, enabled } = req.body;
  const stratagem = await stratagemService.create({
    name,
    code,
    category,
    enabled,
  });
  res.json(stratagem);
}

export async function updateStratagem(req: Request, res: Response) {
  const { id } = req.params;
  const { name, code, category, enabled } = req.body;
  const stratagem = await stratagemService.update(id, {
    name,
    code,
    category,
    enabled,
  });
  res.json(stratagem);
}

export async function deleteStratagem(req: Request, res: Response) {
  const { id } = req.params;
  await stratagemService.delete(id);
  res.json({ message: 'Stratagem deleted successfully' });
}

export async function getDailyStratagem(req: Request, res: Response) {
  const stratagem = await stratagemService.getDaily();
  res.json(stratagem);
}

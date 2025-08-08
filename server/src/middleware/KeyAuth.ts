import { Request, Response, NextFunction } from 'express';

export function keyAuth(req: Request, res: Response, next: NextFunction) {
  const api_key = req.header('x-api-key');

  if (api_key && api_key == process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

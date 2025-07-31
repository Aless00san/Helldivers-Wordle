import { Prisma } from '@prisma/client';

export type StratagemInput = {
  name: string;
  code: Prisma.JsonValue;
  category: string;
  enabled: boolean;
};

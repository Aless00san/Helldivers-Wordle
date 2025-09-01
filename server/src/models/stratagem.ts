import { Prisma } from '@prisma/client';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

export type StratagemInput = {
  name: string;
  code: JsonValue;
  category: string;
  enabled: boolean;
};

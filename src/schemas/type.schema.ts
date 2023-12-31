import { z } from "zod";

export const typeZodSchema = z.enum([
  "bostad",
  "lagenhet",
  "hus",
  "stuga",
  "rum",
]);

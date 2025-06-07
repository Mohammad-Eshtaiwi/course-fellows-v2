import { z } from "zod";

export const createChapterSchema = z.object({
  title: z.string().min(1).max(255),
});

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

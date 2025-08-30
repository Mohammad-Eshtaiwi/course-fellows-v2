import { z } from "zod";

const oldChapters = z.array(
  z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    videos: z.array(
      z.object({
        id: z.string(),
        order: z.number(),
      })
    ),
  })
);

const newChapters = z.array(
  z.object({
    title: z.string(),
    order: z.number(),
    videos: z.array(
      z.object({
        id: z.string(),
        order: z.number(),
      })
    ),
  })
);

const deletedChapters = z.array(z.string());

export const chaptersSchema = z.object({
  oldChapters,
  newChapters,
  deletedChapters,
});

export type OrganizeChaptersSchema = z.infer<typeof chaptersSchema>;

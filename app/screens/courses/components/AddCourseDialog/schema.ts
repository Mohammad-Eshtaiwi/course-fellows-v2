import { z } from "zod";

export const addCourseSchema = z.object({
  type: z.enum(["playlist", "video"]),
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url);
          return urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com";
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid YouTube URL",
      }
    ),
});

export type AddCourseSchema = z.infer<typeof addCourseSchema>; 
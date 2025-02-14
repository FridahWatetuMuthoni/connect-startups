import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  category: z.string().min(3).max(20),
  image: z
    .string()
    .url()
    .superRefine(async (url, ctx) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        if (!contentType?.startsWith("image/")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "URL must be a valid image",
          });
        }
      } catch (error) {
        console.log(error);
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid image URL or unreachable",
        });
      }
    }),
  pitch: z.string().min(3),
});

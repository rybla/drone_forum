import { z } from "zod";

export const PostCommentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  body: z.string(),
});

export type PostComment = z.infer<typeof PostCommentSchema>;

export const PostSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  body: z.string(),
  likes: z.number().int().min(0),
  dislikes: z.number().int().min(0),
  comments: z.array(PostCommentSchema),
});

export type Post = z.infer<typeof PostSchema>;

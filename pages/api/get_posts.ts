import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import { Post } from "@/types";

type ResponseData = {
  posts: Post[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const post_filenames = (await fs.readdir("data/posts")).filter((filename) =>
    filename.endsWith(".json"),
  );
  const posts: Post[] = [];
  for (const post_filename of post_filenames) {
    posts.push(
      JSON.parse(
        await fs.readFile(`data/posts/${post_filename}`, { encoding: "utf8" }),
      ),
    );
  }

  res.json({ posts });
}

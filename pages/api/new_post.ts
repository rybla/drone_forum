import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import { Post } from "@/types";

type ResponseData = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const post: Post = req.body.post;
  fs.writeFile(`data/posts/${post.id}.json`, JSON.stringify(post, null, 4), {
    encoding: "utf8",
  });

  res.json({ success: true });
}

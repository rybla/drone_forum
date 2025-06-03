import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import * as types from "@/types";

type ResponseData = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log("interact_post", req.body);

  try {
    const filepath = `data/posts/${req.body.id}.json`;
    const post: types.Post = JSON.parse(
      await fs.readFile(filepath, { encoding: "utf8" }),
    );

    switch (req.body.action) {
      case "like": {
        post.likes++;
        break;
      }
      case "dislike": {
        post.dislikes++;
        break;
      }
      case "comment": {
        post.comments.push(req.body.comment);
      }
      default: {
        res.json({ success: false });
        break;
      }
    }

    await fs.writeFile(filepath, JSON.stringify(post), { encoding: "utf8" });
    res.json({ success: true });
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    res.json({ success: false });
  }
}

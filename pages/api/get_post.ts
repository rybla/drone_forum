import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import * as types from "@/types";

type ResponseData =
  | { type: "success"; post: types.Post }
  | { type: "error"; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    console.log(`Fetching post ${req.body.id}`);
    const post: types.Post = JSON.parse(
      await fs.readFile(`data/posts/${req.body.id}.json`, { encoding: "utf8" }),
    );
    console.log(`success`);
    res.json({ type: "success", post });
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    console.log(`failed\n${e.toString()}`);
    res.json({ type: "error", message: e.message });
  }
}

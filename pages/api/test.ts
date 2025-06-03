import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  fs.writeFile("data/out", "this is a test", { encoding: "utf8" });
  res.status(200).json({ message: "Hello from Next.js!" });
}

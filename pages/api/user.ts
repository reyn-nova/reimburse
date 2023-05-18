import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          name,
        },
      });

      if (user) {
        res.status(200).json({ message: "Successfully login", user } as any);
      } else {
        res.status(404).json({ message: "User not found", user: null } as any);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id_user) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(req.query.id_user),
          },
        });

        res.status(200).json({
          message: "Successfully retrieve user",
          user: { ...user, password: undefined },
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error } as any);
      }
    } else {
      try {
        const users = await prisma.user.findMany({
          where: {
            role: "User",
          },
        });

        for (const user of users) {
          let usedAllocation = 0;

          const reimburse = await prisma.reimburse.findMany({
            where: {
              id_user: user.id,
            },
          });

          for (const item of reimburse) {
            usedAllocation += item.nominal;
          }

          (user as any).alokasi_terpakai = usedAllocation;
        }

        res.status(200).json({
          message: "Successfully retrieve users",
          users: users.map((user) => ({
            ...user,
            password: undefined,
          })),
        } as any);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error } as any);
      }
    }
  }

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

  if (req.method === "PUT") {
    try {
      const { id_user, nominal_alokasi } = req.body;

      const user = await prisma.user.update({
        where: {
          id: Number(id_user),
        },
        data: {
          nominal_alokasi,
        },
      });

      res
        .status(200)
        .json({
          message: "Successfully update nominal allocation",
          user,
        } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }
}

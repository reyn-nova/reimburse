import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id_user, id_reimburse } = req.query;

      let data;

      if (id_reimburse) {
        data = await prisma.reimburse.findFirst({
          where: {
            id_reimburse: Number(id_reimburse),
          },
        });
      } else {
        if (id_user) {
          data = await prisma.reimburse.findMany({
            where: {
              id_user: Number(id_user),
            },
          });
        } else {
          data = await prisma.reimburse.findMany();
        }
      }

      res
        .status(200)
        .json({ message: "Successfully retrieve data", data } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }

  if (req.method === "POST") {
    try {
      const { id_user, judul, keterangan, nominal, bukti_foto, tanggal } =
        req.body;

      const data = await prisma.reimburse.create({
        data: {
          id_user,
          judul,
          keterangan,
          nominal,
          bukti_foto,
          tanggal,
          status: "Belum Disetujui",
        },
      });

      res
        .status(200)
        .json({ message: "Data successfully created", data } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }

  if (req.method === "PUT") {
    try {
      const {
        id_reimburse,
        judul,
        keterangan,
        nominal,
        bukti_foto,
        id_reviewer,
        status,
        komentar,
      } = req.body;

      await prisma.reimburse.update({
        where: {
          id_reimburse,
        },
        data: {
          judul,
          keterangan,
          nominal,
          bukti_foto,
          id_reviewer,
          status,
          komentar,
        },
      });

      res.status(200).json({ message: "Data successfully updated" } as any);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error } as any);
    }
  }
}

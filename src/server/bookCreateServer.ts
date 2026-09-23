"use server";

import { BookType } from "@/lib/schemaForm";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const bookCreateServer = async (bdata: BookType, bookFile: File) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;

    await sharp(await bookFile.arrayBuffer())
      .resize({
        width: 288,
        height: 288,
      })
      .jpeg({ mozjpeg: true, quality: 97 })
      .toFile(`public/uploads${imageName}`);

    const imageUrl = `/uploads${imageName}`;

    revalidatePath("/bookcreate");

    revalidatePath("/");

    return {
      isSuccess: true,
      isTitle: "Success",
      msg: "Author created successfully.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        isSuccess: false,
        isTitle: error.name,

        msg: error.cause,
      };
    }

    if (error instanceof Error) {
      return {
        isSuccess: false,
        isTitle: error.name,

        msg: error.cause,
      };
    }

    return {
      isSuccess: false,
      isTitle: "Sorry😭",
      msg: "Something happend Wrong...",
    };
  }
};

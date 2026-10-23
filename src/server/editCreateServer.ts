"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookType } from "@/lib/schemaForm";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const bookCreateServer = async (bdata: BookType, bookFile: File) => {
  try {
    const imageName = `${crypto.randomUUID()}.jpeg`;
    console.log(imageName);
    // store name
    const imageBuffer = await bookFile.arrayBuffer();

    // samitize

    await sharp(imageBuffer)
      .resize({
        height: 256,
        width: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`public/uploads/${imageName}`);

    const imageurl = `uploads/${imageName}`;

    await prisma.bookData.create({
      data: {
        bookName: bdata.bookName,
        price: parseInt(bdata.price),
        image: imageurl,
      },
    });

    // revalidatePath("/bookcreate");

    revalidatePath("/");

    return {
      isSuccess: true,
      isTitle: "Success",
      msg: "Book created successfully.",
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

"use server";

import prisma from "@/lib/dbClient/prisma";
import { BookType } from "@/lib/schemaForm";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";

const editCreateServer = async (
  bdata: BookType,

  bookId: string,
) => {
  try {
    await prisma.bookData.update({
      where: { id: bookId },
      data: {
        bookName: bdata.bookName,
        price: parseInt(bdata.price),

        authorData: {
          connect: {
            id: bdata.writer,
          },
        },
      },
    });

    // revalidatePath("/bookcreate");

    revalidatePath("/");
    revalidatePath(`/${bookId}`);

    return {
      isSuccess: true,
      title: "Success",
      msg: "Book data updated.",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        isSuccess: false,
        title: error.name,

        msg: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        isSuccess: false,
        title: error.name,

        msg: error.message,
      };
    }

    return {
      isSuccess: false,
      title: "Sorry😭",
      msg: "Something happend Wrong...",
    };
  }
};

export default editCreateServer;

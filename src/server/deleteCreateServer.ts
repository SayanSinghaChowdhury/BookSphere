"use server";

import prisma from "@/lib/dbClient/prisma";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const deleteCreateServer = async (deletInfo: string, deleteFileUrl: string) => {
  // deletInfo delete second step

  try {
    await rm(`./public/${deleteFileUrl}`);

    await prisma.bookData.delete({
      where: { id: deletInfo },
    });
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

export default deleteCreateServer;

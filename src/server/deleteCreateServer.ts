"use server";

import prisma from "@/lib/dbClient/prisma";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const deleteCreateServer = async (deletInfo: string, deleteFileUrl: string) => {
  // deletInfo delete second step

  try {
    await rm(`public/${deleteFileUrl}`);

    await prisma.bookData.delete({
      where: { id: deletInfo },
    });
    revalidatePath("/");

    return {
      isSuccess: true,
      title: "Success",
      msg: "Book deleted successfully.",
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

export default deleteCreateServer;

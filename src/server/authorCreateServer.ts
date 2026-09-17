"use server";

import prisma from "@/lib/dbClient/prisma";
import { authorSchemaType } from "@/lib/schemaForm";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";

export const authorCreateServer = async (auhData: authorSchemaType) => {
  try {
    await prisma.authorData.create({
      data: auhData,
    });

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

export default authorCreateServer;

"use server";

import prisma from "@/lib/dbClient/prisma";
import { PrismaClientKnownRequestError } from "@generated/prisma/internal/prismaNamespace";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";

const editImage = async (id: string, oldFileUrl: string, bookFile: File) => {
  try {
    // Delete old image
    await rm(`public/${oldFileUrl}`);

    const imageName = `${crypto.randomUUID()}.jpeg`;

    // Convert File to buffer
    const imageBuffer = await bookFile.arrayBuffer();

    // Create new image
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

    const newImageUrl = `uploads/${imageName}`;

    // Update database
    await prisma.bookData.update({
      where: { id },
      data: {
        image: newImageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath(`/${id}`);

    // ✅ Success response
    return {
      isSuccess: true,
      title: "Success",
      msg: "Image updated successfully",
    };
  } catch (error) {
    console.error(error);

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
      title: "Sorry 😭",
      msg: "Something happened wrong...",
    };
  }
};

export default editImage;

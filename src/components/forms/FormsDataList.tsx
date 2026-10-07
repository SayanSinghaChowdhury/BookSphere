"use client";

import { BookDataGetPayload } from "@generated/prisma/models";
import { PenSquareIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";
import DeleteCreateForms from "./DeleteCreateForms";

type bData = {
  bookInfo: BookDataGetPayload<{
    include: {
      authorData: true;
    };
  }>;
};

const FormsDataList = ({ bookInfo: { id, bookName, image, price } }: bData) => {
  return (
    <Card className="grid w-sm place-items-center gap-3">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-center text-lg">
          <button type="button">
            {
              <Avatar className={"size-64"}>
                <AvatarImage
                  src={`/${image}`}
                  alt="@img"
                />
                <AvatarFallback>CI</AvatarFallback>
              </Avatar>
            }
          </button>
        </CardTitle>
        <CardDescription className="font-semibold">{bookName}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="flex place-items-center gap-3">
          Author:
          <p>{bookName}</p>
        </span>

        <span className="flex place-items-center gap-3">
          Price:
          <p>{price}</p>
        </span>
      </CardContent>

      <CardFooter className="grid w-full grid-cols-2 gap-7 pt-7">
        <DeleteCreateForms
          deletInfo={id}
          deleteFileUrl={image}
        />

        <Button
          type="button"
          className="w-full"
          variant={"secondary"}>
          Edit <PenSquareIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormsDataList;

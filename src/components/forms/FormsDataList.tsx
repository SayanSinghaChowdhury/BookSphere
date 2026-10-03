"use client";

import { BookDataGetPayload } from "@generated/prisma/models";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";

type bData = {
  bookInfo: BookDataGetPayload<{
    include: {
      authorData: true;
    };
  }>;
};

const FormsDataList = ({ bookInfo }: bData) => {
  return (
    <Card className="grid w-sm place-items-center gap-3">
      <CardHeader className="w-full">
        <CardTitle className="text-center text-lg">
          {bookInfo.bookName}
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>

      <CardFooter className="grid w-full grid-cols-2 gap-7 pt-7">
        <Button
          type="button"

          className="w-full"

          variant={"destructive"}>
          Delet <Trash2Icon />
        </Button>

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

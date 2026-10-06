"use client";

import { BookDataGetPayload } from "@generated/prisma/models";
import { PenSquareIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../shadcnui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button, buttonVariants } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
      <CardHeader className="w-full text-center">
        <CardTitle className="text-center text-lg">
          <button type="button">
            {
              <Avatar className={"size-64"}>
                <AvatarImage
                  src={bookInfo.image}
                  alt="@img"
                />
                <AvatarFallback>CI</AvatarFallback>
              </Avatar>
            }
          </button>
        </CardTitle>
        <CardDescription className="font-semibold">
          {bookInfo.bookName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="flex place-items-center gap-3">
          Author:
          <p>{bookInfo.bookName}</p>
        </span>

        <span className="flex place-items-center gap-3">
          Price:
          <p>{bookInfo.price}</p>
        </span>
      </CardContent>

      <CardFooter className="grid w-full grid-cols-2 gap-7 pt-7">
        <AlertDialog>
          <AlertDialogTrigger render={<Button>Delete</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently Delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <a
                  href="#"
                  className={buttonVariants()}>
                  Delete
                </a>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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

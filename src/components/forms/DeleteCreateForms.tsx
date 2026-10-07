"use client";

import { Trash2Icon } from "lucide-react";

import deleteCreateServer from "@/server/deleteCreateServer";
import { useState } from "react";
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
import { Button } from "../shadcnui/button";
import { Spinner } from "../shadcnui/spinner";
import { toast } from "../shadcnui/toast";

type DeleteCreateFormsProps = {
  deletInfo: string;
  deleteFileUrl: string;
};

const DeleteCreateForms = ({
  deletInfo,
  deleteFileUrl,
}: DeleteCreateFormsProps) => {
  const [clear, setClear] = useState(false);

  const deleteHandle = async () => {
    setClear(true);
    await new Promise((r) => {
      setTimeout(r, 1500);
    });

    const { isSuccess, isTitle, msg } = await deleteCreateServer(
      deletInfo,
      deleteFileUrl,
    );

    if (isSuccess) {
      toast.add({
        type: "success",
        title: isTitle,
        description: `${msg}`,
        priority: "high",
      });
    } else {
      toast.add({
        type: "error",
        title: isTitle,
        priority: "high",
        description: `${msg}`,
      });
    }

    setClear(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button>
            Delete <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently Delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={clear}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className={"w-auto"}

            onClick={deleteHandle}>
            {/* <Link
              href="#"
              className={buttonVariants()}>
              Delete <Trash2Icon />
            </Link> */}

            {clear ?
              <>
                waiting <Spinner />
              </>
            : <>
                Delete <Trash2Icon />
              </>
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCreateForms;

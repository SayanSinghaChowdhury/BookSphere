"use client";

import { bookSchema, BookType } from "@/lib/schemaForm";
import editImage from "@/server/editImage";
import { AuthorData } from "@generated/prisma/client";
import { BookDataGetPayload } from "@generated/prisma/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { NetworkIcon, SendIcon, ServerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";
import { Separator } from "../shadcnui/separator";
import { toast } from "../shadcnui/toast";

type EditSubmitForms = {
  writer: AuthorData[];
  bookInfo: BookDataGetPayload<{
    include: {
      authorData: true;
    };
  }>;

  editid: string;
  deleteFileUrl: string;
};

const EditCreateForms = ({ writer, bookInfo }: EditSubmitForms) => {
  // for file
  const [file, setFile] = useState(false);

  const { push } = useRouter();

  // Forms Information

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookSchema),

    defaultValues: {
      bookName: bookInfo.bookName,
      price: bookInfo.price.toString(),
      writer: bookInfo.authorDataId,
    },
  });

  const { openFilePicker, filesContent, errors, plainFiles, clear } =
    useFilePicker({
      multiple: false,
      accept: "image/*",
      readAs: "DataURL",

      validators: [
        new FileSizeValidator({ maxFileSize: 1 * 1024 * 1024 /* 1 MB */ }),
      ],

      onFilesSuccessfullySelected: () => setFile(true),

      onClear: () => setFile(false),
    });

  const oldImage = `/${bookInfo.image}`;

  const editImageHandler = async () => {
    const { isSuccess, title, msg } = await editImage(
      bookInfo.id,
      bookInfo.image,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.add({
        type: "success",
        title: title,
        description: `${msg}`,
        priority: "high",
      });
      push("/");
    } else {
      toast.add({
        type: "error",
        title: title,
        priority: "high",
        description: `${msg}`,
      });
    }
  };

  const editHandler = async (editInfo: BookType) => {
    console.log(editInfo);

    // const { isSuccess, isTitle, msg } = await editCreateServer(
    //   editInfo,
    //   plainFiles[0],
    //   editid,
    //   deleteFileUrl,
    // );

    // if (isSuccess) {
    //   toast.add({
    //     type: "success",
    //     title: isTitle,
    //     description: `${msg}`,
    //     priority: "high",
    //   });

    //   clear();
    //   reset();
    //   push("/");
    // } else {
    //   toast.add({
    //     type: "error",
    //     title: isTitle,
    //     priority: "high",
    //     description: `${msg}`,
    //   });
    // }
  };
  return (
    <form onSubmit={handleSubmit(editHandler)}>
      <CardContent className="grid w-sm place-items-center gap-7">
        <button
          type="button"
          onClick={openFilePicker}>
          {!file && (
            <Avatar className={"size-64"}>
              <AvatarImage
                src={oldImage}
                alt="@shadcn"
              />
              <AvatarFallback>CI</AvatarFallback>
            </Avatar>
          )}

          {filesContent.map(({ name, content }) => (
            <Avatar
              key={name}
              className={"size-64"}>
              <AvatarImage
                src={content}
                alt="@shadcn"
              />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          ))}
        </button>
        {errors.map(({ name }) => (
          <FieldError
            className="mt-3 text-lg text-white"
            key={name}
            errors={[{ message: name }]}
          />
        ))}
        <Button
          type="button"
          onClick={editImageHandler}
          className="w-full"
          variant={"default"}
          disabled={!file}>
          {isSubmitting ?
            <>
              Updating <NetworkIcon />
            </>
          : <>
              Update Me <SendIcon />
            </>
          }
        </Button>
        <Separator />
        <Controller
          name="bookName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>BookName</FieldLabel>
              <Input
                className="bg-project text-project"
                {...field}
                id={field.name}
                type="text"
                placeholder=" Name.....of 📚"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* price */}
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
              <Input
                className="bg-project text-project"
                {...field}
                id={field.name}
                type="number"
                placeholder="price.... 💵"
                autoComplete="transaction-amount"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* writer */}
        <Controller
          name="writer"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger className="w-full font-semibold">
                  <SelectValue placeholder="Select Author">
                    {writer.find(({ id }) => id === field.value)?.userName}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {writer.map(({ id, userName }) => (
                    <SelectItem
                      key={id}
                      value={id}>
                      {userName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter className="grid w-full place-items-center">
        <Button
          type="submit"
          className="mt-6 w-full"
          variant={"default"}
          disabled={!isDirty || isSubmitting}>
          {isSubmitting ?
            <>
              Updating... <ServerIcon />
            </>
          : <>
              Update Me <SendIcon />
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default EditCreateForms;

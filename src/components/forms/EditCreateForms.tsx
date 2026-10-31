"use client";

import { bookSchema, BookType } from "@/lib/schemaForm";
import editCreateServer from "@/server/editCreateServer";
import { AuthorData } from "@generated/prisma/client";
import { BookDataGetPayload } from "@generated/prisma/models";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrushCleaningIcon,
  NetworkIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
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
};

const EditCreateForms = ({ writer, bookInfo, editid }: EditSubmitForms) => {
  const [isClear, setIsClear] = useState(false);
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

  const editHandler = async (editInfo: BookType) => {
    console.log(editInfo);

    const { isSuccess, isTitle, msg } = await editCreateServer(
      editInfo,
      plainFiles[0],
      editid,
    );

    if (isSuccess) {
      toast.add({
        type: "success",
        title: isTitle,
        description: `${msg}`,
        priority: "high",
      });

      reset();

      push("/");
    } else {
      toast.add({
        type: "error",
        title: isTitle,
        priority: "high",
        description: `${msg}`,
      });
    }
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
            className="shadow-border m-3 text-lg font-semibold text-red-400"
            key={name}
            errors={[{ message: name }]}
          />
        ))}
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
                  <SelectValue placeholder="Select Writer" />
                </SelectTrigger>

                <SelectContent>
                  {writer.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}>
                      {item.userName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
      <CardFooter className="grid w-full grid-cols-2 gap-7 pt-7">
        <Button
          type="reset"
          disabled={!isDirty}
          className="w-full"
          onClick={() => {
            setIsClear(true);
            setTimeout(() => {
              setIsClear(false);
              reset();
              clear();
            }, 500);
          }}>
          {isClear ?
            <>
              Reseting...
              <BrushCleaningIcon />
            </>
          : <>
              Reset
              <Trash2Icon />
            </>
          }
        </Button>

        <Button
          type="submit"
          className="w-full"
          variant={"secondary"}
          disabled={isSubmitting || !file}>
          {isSubmitting ?
            <>
              Updating <NetworkIcon />
            </>
          : <>
              Update <SendIcon />
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default EditCreateForms;

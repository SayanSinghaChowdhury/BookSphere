"use client";

import { bookSchema, BookType } from "@/lib/schemaForm";
import { bookCreateServer } from "@/server/bookCreateServer";
import { AuthorData } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrushCleaningIcon,
  SendIcon,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
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

import { useRouter } from "next/navigation";
import { FileSizeValidator } from "use-file-picker/validators";
import { toast } from "../shadcnui/toast";

type BookSubmitForms = {
  writer: AuthorData[];
};

const BookCreateForms = ({ writer }: BookSubmitForms) => {
  const [isClear, setIsclear] = useState(false);
  // for file
  const [file, setFile] = useState(false);

  const { push } = useRouter();
  //  process form  data.
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      bookName: "",

      price: "",
      writer: "",
    },
  });
  // file picker process file data.
  const { openFilePicker, filesContent, errors, plainFiles, clear } =
    useFilePicker({
      multiple: false,
      accept: "image/*",
      readAs: "DataURL",

      validators: [
        new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /* 1 MB */ }),
      ],

      onFilesSuccessfullySelected: () => setFile(true),

      onClear: () => setFile(false),
    });

  const bookHandleSubmit = async (bdata: BookType) => {
    const { isSuccess, title, msg } = await bookCreateServer(
      bdata,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.add({
        type: "success",
        title: title,
        description: `${msg}`,
        priority: "high",
      });

      clear();
      reset();
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

  return (
    <form onSubmit={handleSubmit(bookHandleSubmit)}>
      <CardContent className="grid w-sm place-items-center gap-7">
        <button
          type="button"
          onClick={openFilePicker}>
          {!file && (
            <Avatar className={"size-64"}>
              <AvatarImage
                src="https://placehold.co/256x400/png"
                alt="@shadcn"
              />
              <AvatarFallback></AvatarFallback>
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

        <Separator />
        {/* b-name */}
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

      <CardFooter className="grid w-full grid-cols-2 gap-7 pt-7">
        <Button
          type="reset"
          variant={"secondary"}
          disabled={isSubmitting || !file}
          className="w-full"
          onClick={() => {
            setIsclear(true);
            setTimeout(() => {
              setIsclear(false);
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
          variant={"default"}
          disabled={!isDirty || isSubmitting || !file}>
          {isSubmitting ?
            <>
              Submiting <UploadCloudIcon />
            </>
          : <>
              Submit <SendIcon />
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default BookCreateForms;

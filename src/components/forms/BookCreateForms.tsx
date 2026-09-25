"use client";

import { bookSchema, BookType } from "@/lib/schemaForm";
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

import { bookCreateServer } from "@/server/bookCreateServer";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";

type BookCreateForms = {
  writer: AuthorData[];
};

const BookCreateForms = ({ writer }: BookCreateForms) => {
  console.log(writer);

  const [clear, setClear] = useState(false);
  // for file
  const [file, setFile] = useState(false);
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
  const { openFilePicker, filesContent, errors, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",

    validators: [
      new FileSizeValidator({ maxFileSize: 1 * 1024 * 1024 /* 1 MB */ }),
    ],

    onFilesSuccessfullySelected: () => setFile(true),

    onClear: () => setFile(false),
  });

  const bookHandleSubmit = async (bdata: BookType) => {
    const {} = await bookCreateServer(bdata, plainFiles[0]);
    console.log(bdata);
  };

  return (
    <form onSubmit={handleSubmit(bookHandleSubmit)}>
      <CardContent className="grid w-sm place-items-center gap-7">
        <button onClick={openFilePicker}>
          {!file && (
            <Avatar className={"size-64"}>
              <AvatarImage
                src="https://placehold.net/book-400x400.png"
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

          {errors.map(({ name }) => (
            <FieldError
              key={name}
              errors={[{ message: name }]}
            />
          ))}
        </button>

        <Button
          disabled={!file}
          type="submit"
          className={"w-full"}
          variant={"default"}>
          Upload Image <SendIcon />
        </Button>

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
                  <SelectValue placeholder="Select Writer" />
                </SelectTrigger>

                <SelectContent>
                  {writer.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.userName}>
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

          disabled={!isDirty || !file}

          className="w-full"
          onClick={() => {
            setClear(true);
            setTimeout(() => {
              setClear(false);
              reset();
            }, 500);
          }}
          variant={"destructive"}>
          {clear ?
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
          disabled={!isDirty || !file}>
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

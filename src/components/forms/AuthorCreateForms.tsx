"use client";

import { CardContent, CardFooter } from "../shadcnui/card";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

import { authorSchema, authorSchemaType } from "@/lib/schemaForm";
import authorCreateServer from "@/server/authorCreateServer";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrushCleaningIcon,
  SendIcon,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

const AuthorCreateForms = () => {
  const [clear, setClear] = useState(false);

  const { push } = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      userName: "",
      email: "",
    },
  });

  const handleAuthorForm = async (auhData: authorSchemaType) => {
    await new Promise((t) => {
      setTimeout(t, 1000);
    });

    const { isSuccess, isTitle, msg } = await authorCreateServer(auhData);

    if (isSuccess) {
      toast.add({
        type: "success",
        title: isTitle,
        description: msg,
      });

      reset();

      push("/bookcreate");
    } else {
      toast.add({
        type: "error",
        title: isTitle,
        description: msg,
      });
    }
  };

  return (
    <form
      className="w-full space-y-7"
      onSubmit={handleSubmit(handleAuthorForm)}
      noValidate>
      <CardContent className="grid w-sm place-items-center gap-7">
        <Controller
          name="userName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
              <Input
                className="bg-project text-project"
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your Name"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>User Email</FieldLabel>
              <Input
                className="text-project bg-project"
                {...field}
                id={field.name}
                type="email"
                placeholder="Enter your Email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter className="grid grid-cols-2 place-items-center gap-3">
        <Button
          type="reset"

          disabled={!isDirty}

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
          disabled={!isDirty}>
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

export default AuthorCreateForms;

"use client";

import { CardContent, CardFooter } from "../shadcnui/card";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

import { author, AuthorType } from "@/lib/schemaForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrushCleaningIcon,
  SendIcon,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { useState } from "react";
import { setTimeout } from "timers";
import { Button } from "../shadcnui/button";

const AuthorCreateForms = () => {
  const [clear, setClear] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(author),
    defaultValues: {
      userName: "",
      email: "",
    },
  });

  const handleAuthorForm = async (auhData: AuthorType) => {
    await new Promise((t) => {
      setTimeout(t, 1000);
    });

    console.log(auhData);

    reset();
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
              (reset(), setClear(false));
            }, 1000);
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

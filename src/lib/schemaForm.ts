import z from "zod";

export const authorSchema = z.object({
  userName: z
    .string({ error: "Name is required." })
    .min(6, { error: "Name must be at least 6 characters long." })
    .max(36, { error: "Name must not exceed 50 characters." }),

  email: z.email({ error: "Please enter a valid email address." }),
});

export type authorSchemaType = z.infer<typeof authorSchema>;

export const bookSchema = z.object({
  bookName: z
    .string({ error: "Name is required." })
    .min(6, { error: "Name must be at least 6 characters long." })
    .max(36, { error: "Name must not exceed 50 characters." }),

  price: z
    .string({ error: "Price is required." })
    .min(1, { error: "Price must be at least 10 amount long." }),

  image: z
    .url()
    .trim()
    .min(1, "Image URL is required")
    .max(2048, "Image URL is too long"),

  writer: z
    .string({ error: "Name is required." })
    .min(6, { error: "Name must be at least 6 characters long." })
    .max(36, { error: "Name must not exceed 50 characters." }),
});

export type BookType = z.infer<typeof bookSchema>;

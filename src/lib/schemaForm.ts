import z from "zod";

export const author = z.object({
  userName: z
    .string({ error: "Name is required." })
    .min(6, { error: "Name must be at least 6 characters long." })
    .max(36, { error: "Name must not exceed 50 characters." }),

  email: z.email({ error: "Please enter a valid email address." }),
});

export type AuthorType = z.infer<typeof author>;

export const book = z.object({
  bookName: z
    .string({ error: "Name is required." })
    .min(6, { error: "Name must be at least 6 characters long." })
    .max(36, { error: "Name must not exceed 50 characters." }),

  price: z
    .string()
    .min(10, { error: "Price must be at least 10 amount long." })
    .max(100000, { error: "Price must not exceed 100000 amount." }),

  //   image: z
  //     .string()
  //     .trim()
  //     .min(1, "Image URL is required")
  //     .max(2048, "Image URL is too long"),

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

export type BookType = z.infer<typeof book>;

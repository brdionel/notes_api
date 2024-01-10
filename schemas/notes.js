import z from "zod";

const noteSchema = z.object({
  title: z
    .string({
      invalid_type_error: "O title deve ser um string",
      required_error: "O title é necessario",
    })
    .min(5, { message: "Title must be 5 or more characters long" }),
  content: z.string(),
  is_archived: z.boolean().default(false),
  categories: z.array(z.number()).default([]),
});

export function validateNote(object) {
  return noteSchema.safeParse(object);
}

export function validatePatialNote(object) {
  return noteSchema.partial().safeParse(object);
}

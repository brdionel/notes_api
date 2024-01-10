import z from "zod";

const categorySchema = z.object({
  name: z.string({
    invalid_type_error: "O name da categoria deve ser um string",
    required_error: "O name da categoria é necessario",
  }),
});

export function validateCategory(object) {
  return categorySchema.safeParse(object);
}

export function validatePatialCategory(object) {
  return categorySchema.partial().safeParse(object);
}

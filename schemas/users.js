import z from "zod";

const userSchema = z.object({
  email: z
    .string({
      required_error: "O email é necessario",
    })
    .email(),
  password: z.string({
    required_error: "O password é necessario",
  }),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}

import * as z from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be between 3 and 20 characters.",
    })
    .max(20, {
      message: "Username must be between 3 and 20 characters.",
    }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must contain 6 characters.",
    })
    .max(35, {
      message: "Password must be under 35 characters.",
    }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email cannot be empty.",
    })
    .max(35, {
      message: "Email must be under 35 characters.",
    })
    .email({ message: "Please enter a valid email." }),
});

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("A valid email is required").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(10, "New password must be at least 10 characters")
      .max(128)
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/\d/, "Must contain a number"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "The new password must differ from the current one",
    path: ["newPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

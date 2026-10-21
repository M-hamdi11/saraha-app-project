
import * as z from "zod";

export const emailField = z.string().trim().toLowerCase().email("Invalid email format");

export const strongPassword = z.string().regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character"
);

export const otpField = z.string().trim().length(6, "otp must be 6 digits").regex(/^\d+$/, "otp must be numbers only");
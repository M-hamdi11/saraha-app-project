// schemas/otp-auth.js
import * as z from "zod";
import { emailField, otpField, strongPassword } from "../schemas/commonschemas.js";

export const forgotPasswordSchema = z.object({ email: emailField }).strict();

export const verifyOtpSchema = z.object({ email: emailField, otp: otpField }).strict();

export const resetPasswordSchema = z.object({
  resetToken: z.string().length(64, "invalid token"),
  newpassword: strongPassword,
}).strict();

export const resendOtpSchema = z.object({ email: emailField }).strict();

export const verifyEmailSchema = z.object({ email: emailField, otp: otpField }).strict();

export const updatePasswordSchema = z.object({
  newpassword: strongPassword,
}).strict();

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "refresh token is required"),
}).strict();
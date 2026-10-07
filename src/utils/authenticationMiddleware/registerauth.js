import * as z from 'zod'
import { loginschema } from "./loginauth.js";


export const registerSchema = loginschema.extend({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character"
    ),
    phone: z.string().regex(
        /^(\+20|0020|0)?1[0125]\d{8}$/,
        "Invalid Egyptian phone number"
    )
})
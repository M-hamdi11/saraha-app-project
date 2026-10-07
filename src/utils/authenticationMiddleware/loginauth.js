import * as z from "zod";
export const loginschema= z.object({
    email:z.email('Invalid email format'),
     password:z.string().min(1, "Password is required")
})

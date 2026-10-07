import * as z from 'zod'
export const updateProfileSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phone: z.string().regex(/^(\+20|0020|0)?1[0125]\d{8}$/).optional()
}).strict()

export const updateProfileSchemaAdmin= updateProfileSchema.extend({
       id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'invalid id'),
})
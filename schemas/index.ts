import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'username must be at least one character' })
    .min(3, { message: 'username must be at least three characters' })
    .max(20, { message: 'username must be at most twenty characters' }),
})

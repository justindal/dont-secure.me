import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'username must be at least three characters' })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'username must not contain special characters',
    })
    .max(20, { message: 'username must be at most twenty characters' })
})

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'username must be at least three characters' })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'username must not contain special characters',
    })
    .max(20, { message: 'username must be at most twenty characters' }),
  name: z
    .string()
    .min(3, { message: 'name must be at least three characters' })
    .max(20, { message: 'name must be at most twenty characters' }),
})
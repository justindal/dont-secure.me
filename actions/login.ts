'use server'

import { z } from 'zod'

import { LoginSchema } from '@root/schemas'

export const login = (values: z.infer<typeof LoginSchema>) => {
  console.log(values)
}

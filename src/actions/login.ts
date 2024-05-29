'use server'

import { z } from 'zod'

import { LoginSchema } from '@/schemas'

import { signIn } from '@/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values)
  await signIn('credentials', {
    username: values.username,
    redirectTo: '/home',
  })
}

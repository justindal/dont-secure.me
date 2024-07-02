'use server'

import { z } from 'zod'

import { LoginSchema } from '@/schemas'

import { signIn } from '@/auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values)
  try {
    await signIn('credentials', {
      username: values.username,
      redirectTo: '/home',
    })
  } catch (error) {
    // @ts-ignore
    if (error.message.includes('')) {
      //
    }
  }
}

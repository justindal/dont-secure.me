'use server'

import { z } from 'zod'

import { LoginSchema } from '@/schemas'

import { signIn } from '@/auth'

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean }> => {
  console.log(values)
  try {
    await signIn('credentials', {
      username: values.username,
      redirectTo: '/home',
    })
    return { success: true }
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    console.error('Error logging in: ', error)
    return { success: false }

  }
}

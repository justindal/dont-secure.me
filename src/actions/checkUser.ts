'use server'

import db from '@/lib/db'

export const checkUser = async (username: string) => {
  const user = await db.getUser(username)
  if (user) {
    return user
  } else {
    return null
  }
}

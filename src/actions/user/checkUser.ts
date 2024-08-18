'use server'

import db from '@/lib/db'

const checkUser = async (username: string) => {
  const user = await db.getUser(username)
  if (user) {
    return user
  } else {
    return null
  }
}

export default checkUser
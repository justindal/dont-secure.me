'use server'

import db from '@/lib/db'

export const getSuggestedUsers = async () => {
  const client = await db.clientPromise
  const database = client.db('tester')
  const users = database.collection('users')

  const suggestedUsers = await users.find({}).limit(100).toArray()

  const randomUsers = suggestedUsers.sort(() => 0.5 - Math.random()).slice(0, 5)
  return randomUsers

}

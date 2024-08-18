'use server'

import db from '@/lib/db'

export const getSuggestedUsers = async () => {
  const client = await db.clientPromise
  const database = client.db('tester')
  const users = database.collection('users')

  const suggestedUsers = await users
    .find({})
    .sort({ $natural: -1 })
    .limit(3)
    .toArray()

  return suggestedUsers
}

'use server'

import db from '@/lib/db'
import ObjectID from 'mongodb'

const followUser = async (
  userId: ObjectID.ObjectId,
  follower: ObjectID.ObjectId,
) => {
  const client = await db.clientPromise
  const database = client.db()
  const users = database.collection('followers')
  await users.updateOne(
    // { username: username },
    // { $addToSet: { followers: follower } },
    { _id: userId },
    { $addToSet: { followers: follower } },
  )
}

export default followUser

'use server'

import db from '@/lib/db'
import { ObjectId } from 'mongodb'

async function createUser(username: string, name: string) {
  const client = await db.clientPromise
  const database = client.db()
  const users = database.collection('users')

  const user = {
    _id: new ObjectId(),
    username: username,
    name: name,
    date: new Date()
  }

  await users.insertOne(user)
  
  return {
    ...user,
    _id: user._id.toString(),
  }
}

export default createUser
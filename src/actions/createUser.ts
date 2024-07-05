'use server'

import db from '@/lib/db'

async function createUser(username: string, name: string) {
  const client = await db.clientPromise
  const database = client.db()
  const users = database.collection('users')
  await users.insertOne({ username: username, name: name, date: new Date()})
}

export default createUser
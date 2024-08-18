'use server'

import db from '@/lib/db'
import { User, Session } from 'next-auth'

interface Post {
  title?: string
  description?: string
  user: User
}

const createPost = async ({ title, description, user }: Post) => {
  const client = await db.clientPromise
  const database = client.db('tester')
  const posts = database.collection('posts')
  const post = await posts.insertOne({
    title,
    description,
    user: user._id,
    username: user.username,
    date: new Date(),
  })
  return post
}

export default createPost

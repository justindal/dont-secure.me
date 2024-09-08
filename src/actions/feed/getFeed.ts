'use server'

import db from '@/lib/db'
import { auth } from '@/auth'

const followingFeed = async (page = 1, limit = 20) => {
  const session = await auth()
  if (!session) {
    return {
      error: 'Not authenticated',
    }
  }

  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const posts = database.collection('posts')

  const getFollowingList = async () => {
    const following = await database
      .collection('followers')
      .find({
        user: session.user._id,
      })
      .toArray()
    return following.map((f) => f.following) || []
  }

  const followingList = await getFollowingList()
  const feed = await posts
    .find({ user: { $in: followingList } })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()
  return feed
}

const homeFeed = async (page = 1, limit = 20) => {
  const session = await auth()
  if (!session) {
    return {
      error: 'Not authenticated',
    }
  }

  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const posts = database.collection('posts')

  // randomly get posts from database
  const feed = await posts.find().sort({ date: -1 }).limit(limit).toArray()
  // Shuffle the array
  const shuffledFeed = feed.sort(() => 0.5 - Math.random())

  return shuffledFeed.slice(0, limit)
}

const userFeed = async (username: string, page = 1, limit = 20) => {
  const session = await auth()
  if (!session) {
    return {
      error: 'Not authenticated',
    }
  }
  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const posts = database.collection('posts')
  const user = await database.collection('users').findOne({ username })
  if (!user) {
    return {
      error: 'User not found',
    }
  }
  const feed = await posts
    .find({ user: user._id.toString() })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()
  return feed
}

const savedFeed = async (page = 1, limit = 20) => {
  const session = await auth()
  if (!session) {
    return {
      error: 'Not authenticated',
    }
  }
  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const saved = database.collection('saved')
  const posts = database.collection('posts')

  const savedPosts = await saved
    .find({ user: session.user._id })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()

  if (savedPosts.length === 0) {
    return [] // Return an empty array if there are no saved posts
  }

  const savedPostIds = savedPosts.map(savedPost => savedPost.post)

  const feed = await posts
    .find({ _id: { $in: savedPostIds } })
    .toArray()

  return feed
}
export { followingFeed, homeFeed, userFeed, savedFeed }

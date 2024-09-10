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
  const users = database.collection('users')

  const searchPattern = username.split('').join('.*')
  const regexPattern = new RegExp(searchPattern, 'i')

  const similarUsers = await users
    .find({ username: { $regex: regexPattern } })
    .toArray()

  const userIds = similarUsers.map((user) => user._id.toString())

  const feed = await posts
    .find({ user: { $in: userIds } })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()

  if (feed.length === 0) {
    return []
  }
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

  if (savedPosts.length === 0) return []

  const savedPostIds = savedPosts.map((savedPost) => savedPost.post)

  const feed = await posts.find({ _id: { $in: savedPostIds } }).toArray()

  // Sort the feed based on the order of savedPosts
  const sortedFeed = savedPosts
    .map((savedPost) =>
      feed.find((post) => post._id.toString() === savedPost.post.toString()),
    )
    .filter(Boolean)

  return sortedFeed
}

const searchUsersFeed = async (query: string, page = 1, limit = 20) => {
  const session = await auth()
  if (!session) {
    return {
      error: 'Not authenticated',
    }
  }
  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const users = database.collection('users')

  const searchPattern = query.split('').join('.*')
  const regexPattern = new RegExp(searchPattern, 'i')

  const feed = await users
    .find({ username: { $regex: regexPattern } })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()

  if (feed.length === 0) return []

  return feed
}
export { followingFeed, homeFeed, userFeed, savedFeed, searchUsersFeed }

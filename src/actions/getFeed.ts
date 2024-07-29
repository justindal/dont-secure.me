'use server'

import db from '@/lib/db'
import { auth } from '@/auth'

const getFeed = async (page = 1, limit = 20) => {
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
      .collection('following')
      .find({
        user: session.user._id,
      })
      .toArray()
    return following.map((f) => f.following)
  }

  const feed = await posts
    .aggregate([
      { $match: { user: { $in: await getFollowingList() } } },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
    ])
    .toArray()
  return feed
}

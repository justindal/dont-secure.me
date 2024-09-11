'use server'

import db from '@/lib/db'
import { auth } from '@/auth'

const toggleFollow = async (username: string, action?: 'toggle' | 'status') => {
  const currentSession = await auth()
  const currentUser = currentSession?.user
  if (!currentUser || !currentUser.username) {
    return { error: 'User not authenticated' }
  }

  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const follows = database.collection('followers')
  const users = database.collection('users')

  const followedUser = await users.findOne({ username: username })
  if (!followedUser) {
    return { error: 'User not found' }
  }

  const existingFollow = await follows.findOne({
    followedUsername: username,
    followerUsername: currentUser.username,
  })

  const totalFollowers = followedUser.followerCount || 0

  if (action === 'status' || action === undefined) {
    return {
      success: true,
      isFollowing: !!existingFollow,
      totalFollowers,
    }
  }
    
  if (existingFollow) {
    // Unfollow logic
    await follows.deleteOne({ _id: existingFollow._id })
    await users.updateOne(
      { username: username },
      { $inc: { followerCount: -1 } }
    )
    return {
      success: true,
      message: 'User unfollowed successfully',
      action: 'unfollowed',
      isFollowing: false,
      totalFollowers: totalFollowers - 1,
    }
  } else {
    // Follow logic
    const newFollow = {
        followedUsername: username,
        followerUsername: currentUser.username,
        createdAt: new Date(),
    }
    await follows.insertOne(newFollow)
    await users.updateOne(
      { username: username },
      { $inc: { followerCount: 1 } }
    )
    return {
      success: true,
      message: 'User followed successfully',
      action: 'followed',
      isFollowing: true,
      totalFollowers: totalFollowers + 1,
    }
  }
}

export default toggleFollow

'use server'

import db from '@/lib/db'
import { ObjectId } from 'mongodb'
import { auth } from '@/auth'

const toggleLike = async (postId: ObjectId) => {
  const currentSession = await auth()
  const currentUser = currentSession?.user
  if (!currentUser || !currentUser.username) {
    return { error: 'User not authenticated' }
  }

  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const likes = database.collection('likes')
  const posts = database.collection('posts')

  const existingLike = await likes.findOne({
    postId: new ObjectId(postId),
    username: currentUser.username,
  })

  const post = await posts.findOne({ _id: new ObjectId(postId) })
  const totalLikes = post ? post.likeCount : 0

  if (existingLike) {
    // Unlike the post
    await likes.deleteOne({ _id: existingLike._id })
    await posts.updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { likeCount: -1 } }
    )
    return { success: true, message: 'Post unliked successfully', action: 'unliked', isLiked: false, totalLikes: totalLikes - 1 }
  } else {
    // Like the post
    const newLike = {
      postId: new ObjectId(postId),
      username: currentUser.username,
      createdAt: new Date(),
    }
    await likes.insertOne(newLike)
    await posts.updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { likeCount: 1 } }
    )
    return { success: true, message: 'Post liked successfully', action: 'liked', isLiked: true, totalLikes: totalLikes + 1 }
  }
}
export default toggleLike

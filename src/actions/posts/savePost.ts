'use server'

import db from '@/lib/db'
import { auth } from '@/auth'
import { ObjectId } from 'mongodb'

const toggleSave = async (
  postId: string,
  action: 'save' | 'unsave' | 'toggle' | 'status',
) => {
  const currentSession = await auth()
  const currentUser = currentSession?.user
  if (!currentUser || !currentUser.username) {
    return { error: 'User not authenticated' }
  }
  const client = await db.clientPromise
  const database = client.db(process.env.DB_NAME)
  const saved = database.collection('saved')
  const post = await database
    .collection('posts')
    .findOne({ _id: new ObjectId(postId) })
  if (!post) {
    return { error: 'Post not found' }
  }
  const existingSaved = await saved.findOne({
    user: currentUser._id,
    post: post._id,
  })

  if (action === 'status' || action === 'toggle') {
    return { 
      success: true, 
      isSaved: !!existingSaved
    }
  }

  if (action === 'save') {
    if (existingSaved) {
      return { error: 'Post already saved' }
    }
    await saved.insertOne({
      user: currentUser._id,
      post: post._id,
      date: new Date(),
    })
    return { success: true, isSaved: true }
  }

  if (action === 'unsave') {
    if (existingSaved) {
      await saved.deleteOne({ _id: existingSaved._id })
      return { success: true, isSaved: false }
    }
    return { error: 'Post not saved' }
  }
}
export { toggleSave }

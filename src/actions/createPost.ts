'use server'

import db from '@/lib/db'

interface Post {
  title?: string
  description?: string
  user: string
}

const createPost = async (post: Post) => {}

export default createPost

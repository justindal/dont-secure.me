import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import {
  followingFeed,
  homeFeed,
  userFeed,
  searchPostFeed,
  savedFeed,
  searchUsersFeed,
} from '@/actions/feed/getFeed'

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const username = searchParams.get('username')
  const query = searchParams.get('query')

  try {
    let feed
    switch (type) {
      case 'following':
        feed = await followingFeed(page, limit)
        break
      case 'home':
        feed = await homeFeed(page, limit)
        break
      case 'user':
        if (!username) {
          return NextResponse.json(
            { error: 'Username is required for user feed' },
            { status: 400 },
          )
        }
        feed = await userFeed(username, page, limit)
        break
      case 'searchPost':
        if (!username) {
          return NextResponse.json(
            { error: 'Username is required for search post feed' },
            { status: 400 },
          )
        }
        feed = await searchPostFeed(username, page, limit)
        break
      case 'saved':
        feed = await savedFeed(page, limit)
        break
      case 'searchUsers':
        if (!query) {
          return NextResponse.json(
            { error: 'Query is required for search users feed' },
            { status: 400 },
          )
        }
        feed = await searchUsersFeed(query, page, limit)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid feed type' },
          { status: 400 },
        )
    }

    return NextResponse.json(feed, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
})

import { NextRequest, NextResponse } from 'next/server'
import toggleFollow from '@/actions/user/followUser'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const result = await toggleFollow(username, 'status')
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { username } = await req.json()

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const result = await toggleFollow(username, 'toggle')
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
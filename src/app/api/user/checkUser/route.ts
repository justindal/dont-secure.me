import { NextRequest, NextResponse } from 'next/server'
import checkUser from '@/actions/user/checkUser'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const user = await checkUser(username)
    if (user) {
      // Convert ObjectId to string for JSON serialization if necessary
      return NextResponse.json({
        ...user,
        _id: user._id.toString(),
      }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
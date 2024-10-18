import { auth, signIn } from '@/auth'
import { NextResponse } from 'next/server'

export const POST = auth(async function POST(req) {
  try {
    const { username } = await req.json()
    const user = await signIn('credentials', {
      username: username,
    })
    if (user) {
      return NextResponse.json({ success: true, user })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 },
      )
    }
  } catch (error) {
    // if NEXT__REDIRECT is thrown, throw
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    )
  }
})

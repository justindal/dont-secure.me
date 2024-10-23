import { auth, signIn } from '@/auth'
import { NextResponse } from 'next/server'

export const POST = auth(async function POST(req) {
  // if user is already logged in, return user and session
  const session = await auth()
  if (session) {
    return NextResponse.json({ success: true, user: session.user, session })
  }

  try {
    const { username } = await req.json()
    const result = await signIn('credentials', {
      username: username,
      redirect: false,
    })

    if (result && 'error' in result && !result.error) {
      const newSession = await auth()
      return NextResponse.json({ success: true, user: newSession?.user, session: newSession })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 },
      )
    }
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    )
  }

})
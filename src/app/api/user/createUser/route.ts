import { NextRequest, NextResponse } from 'next/server'
import createUser from '@/actions/user/createUser'
import checkUser from '@/actions/user/checkUser'

export async function POST(req: NextRequest) {
  try {
    const { username, name } = await req.json()
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      )
    }
    const user = await checkUser(username)
    if (user) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 },
      )
    }
    const newUser = await createUser(username, name)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

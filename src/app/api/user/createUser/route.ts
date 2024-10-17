import { NextRequest, NextResponse } from 'next/server'
import createUser from '@/actions/user/createUser'

export async function POST(req: NextRequest) {
  try {
    const { username, name } = await req.json()
    const newUser = await createUser(username, name)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
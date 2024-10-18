import { auth } from '@/auth'
import { NextResponse, NextRequest } from 'next/server'
import { getSuggestedUsers } from '@/actions/user/getSuggestedUsers'

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    const suggestedUsers = await getSuggestedUsers()
    return NextResponse.json({ suggestedUsers }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
})

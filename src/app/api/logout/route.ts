import { NextResponse } from 'next/server'
import { logout } from '@/actions/login/logout'

export const POST = async function POST(req: Request) {
  try {
    const response = await logout()
    return response
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

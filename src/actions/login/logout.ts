'use server'

import { signOut } from '@/auth'
import { NextResponse } from 'next/server'

export const logout = async () => {
  await signOut({
    redirectTo: '/',
  })

  // Clear cookies
  const response = NextResponse.redirect('/')
  response.cookies.set('authjs.session-token', '', { path: '/', expires: new Date(0) })
  response.cookies.set('authjs.csrf-token', '', { path: '/', expires: new Date(0) })
  return response
}

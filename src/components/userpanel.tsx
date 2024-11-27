'use client'

import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { logout } from '@/actions/login/logout'
import { Session } from 'next-auth'

interface PanelProps {
  session: Session
}

const Panel = ({ session }: PanelProps) => {
  function signout() {
    console.log('logout')
    logout()
  }

  return (
    <Card className='m-4'>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>
          <Link href={'/home'}>Home</Link>
        </CardTitle>
      </CardHeader>
      <CardHeader>
        <Link href={'/saved'}>
          <CardTitle className='hover:underline cursor-pointer'>
            Saved
          </CardTitle>
        </Link>
      </CardHeader>
      <CardHeader>
        <Link href={'/settings'}>
          <CardTitle className='hover:underline cursor-pointer'>
            Settings
          </CardTitle>
        </Link>
      </CardHeader>
      <CardHeader>
        <Link href={'/user/profile'}>
          <CardTitle className='hover:underline cursor-pointer'>
            @{session.user.username}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer' onClick={signout}>
          Logout
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default Panel

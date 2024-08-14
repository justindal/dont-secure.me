'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { logout } from '@/actions/logout'
import { Session } from 'next-auth'

interface PanelProps {
  session: Session
}

const Panel = ({session}: PanelProps) => {
  function signout() {
    console.log('logout')
    logout()
  }

  return (
    <Card className='m-4'>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>Home</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>Notifications</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>Saved</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>Settings</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline cursor-pointer'>@{session.user.username}</CardTitle>
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

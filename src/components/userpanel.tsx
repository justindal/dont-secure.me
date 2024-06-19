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

const Panel = () => {

  function signout() {
    console.log('logout')
    logout()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='hover:underline'>Home</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline'>Notifications</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline'>Saved</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline'>Settings</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline'>Profile</CardTitle>
      </CardHeader>
      <CardHeader>
        <CardTitle className='hover:underline' onClick={signout}>Logout</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default Panel

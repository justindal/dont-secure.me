/**
 * page component, will be the the content of the current user's profile page
 * will include the user's posts, followers, and following
 * profile picture, display name, username, bio, location, website, join date
 */

'use server'

import React from 'react'
import Feed from './feed'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from 'next/link'

interface ProfileHeadProps {
  username: string
  displayName: string
  bio: string
  location: string
  website: string
  joinDate: string
}

const ProfileHead = ({
  username,
  displayName,
  bio,
  location,
  website, // https:
  joinDate,
}: ProfileHeadProps) => {
  displayName = 'justin dal'
  username = 'justindal'
  bio = 'justin dal is a software engineer'
  location = 'toronto'
  website = 'justindal.com'
  joinDate = '2021-01-01'
  return (
    <div className='p-1 m-1'>
      <Card>
        <CardHeader className='m-1'>
          <div className='flex justify-between items-center'>
            <div>
              {displayName && <CardTitle>{displayName}</CardTitle>}@{username}
              <CardDescription> joined{joinDate}</CardDescription>
            </div>
            <Avatar className='h-16 w-16'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {bio}
            <br />
            {location}
            <br />
            <Link href={website} passHref={true}>
              {website}
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileHead

/**
 * page component, will be the the content of the current user's profile page
 * will include the user's posts, followers, and following
 * profile picture, display name, username, bio, location, website, join date
 */

'use client'

import React, { useState, useEffect } from 'react'

import { getProfilePicture } from '@/actions/profilepicture/getProfilePicture'

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
  displayName?: string
  bio?: string
  location?: string
  website?: string
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
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const base64Image = await getProfilePicture(username)
        if (base64Image) {
          setImageURL(base64Image)
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error)
      }
    }

    fetchProfilePicture()

    // Cleanup function to revoke the object URL
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL)
      }
    }
  }, [username])

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
              <AvatarImage src={imageURL} alt='Profile Picture' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {bio && bio}
            <br />
            {location && location}
            <br />
            {website && (
              <Link href={website} passHref={true}>
                {website}
              </Link>
            )}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileHead

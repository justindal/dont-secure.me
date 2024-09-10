'use client'

import { useState, useEffect } from 'react'
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

interface UserCardProps {
  username: string
  displayName?: string
  bio?: string
}

const UserCard = ({ username, displayName, bio }: UserCardProps) => {
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
      <Card className='bg-gray-800'>
        <CardHeader className='m-1'>
          <div className='flex justify-between items-center'>
            <div>
              {displayName && <CardTitle>{displayName}</CardTitle>}@{username}
            </div>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={imageURL} alt='Profile Picture' />
              <AvatarFallback>:)</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        {bio && (
          <CardContent>
            <CardDescription className='text-sm'>{bio}</CardDescription>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default UserCard

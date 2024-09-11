'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'

import toggleFollow from '@/actions/user/followUser'

interface UserCardProps {
  username: string
  displayName?: string
  bio?: string
  session: Session
}

const UserCard = ({ username, bio, session }: UserCardProps) => {
  const [mounted, setMounted] = useState(false)
  const isCurrentUser = session?.user?.username === username
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFollowToggle = async () => {
    const result = await toggleFollow(username, 'toggle')
    console.log('FOLLOWING RESULT:', result)
    if (result.success) {
      setIsFollowing(result.isFollowing)
      setFollowerCount(result.totalFollowers)
    }
  }

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const result = await toggleFollow(username, 'status')
      console.log('fetch follow RESULT:', result)
      if (result.success) {
        setIsFollowing(result.isFollowing)
        setFollowerCount(result.totalFollowers)
      }
    }
    fetchFollowStatus()
  }, [username])

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

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className='p-1 m-1'>
      <Card className='bg-gray-800'>
        <CardHeader className='m-1'>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <Link className='font-semibold' href={`/user/${username}`}>
                @{username}
              </Link>
              {bio && <p className='text-sm mt-2'>{bio}</p>}
              <CardDescription>
                <div className='text-sm mt-2'>{followerCount} followers</div>
              </CardDescription>
            </div>
            <div className='flex flex-col items-center'>
              <Avatar className='h-16 w-16 mb-2'>
                <AvatarImage src={imageURL} alt='Profile Picture' />
                <AvatarFallback>:)</AvatarFallback>
              </Avatar>
              <Button 
                onClick={handleFollowToggle} 
                className='mt-2 text-xs px-2 py-1 h-6'
                disabled={isCurrentUser}
                variant="outline"
              >
                {isCurrentUser ? 'You' : isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default UserCard

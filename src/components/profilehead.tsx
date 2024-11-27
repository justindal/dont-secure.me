/**
 * page component, will be the the content of the current user's profile page
 * will include the user's posts, followers, and following
 * profile picture, display name, username, bio, location, website, join date
 */

'use client'

import React, { useState, useEffect } from 'react'

import { getProfilePicture } from '@/actions/profilepicture/getProfilePicture'
import { useFollowStatus } from '@/contexts/FollowContext'
import toggleFollow from '@/actions/user/followUser'

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
import Link from 'next/link'

interface ProfileHeadProps {
  username: string
  displayName?: string
  bio?: string
  joinDate: string
  session?: Session
}

const ProfileHead = ({
  username,
  displayName,
  bio, // Verify bio prop is received
  joinDate,
  session,
}: ProfileHeadProps) => {
  // Add console.log for debugging
  console.log('Profile bio:', bio)

  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  const { followStatus, setFollowStatus } = useFollowStatus()
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)

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

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (session?.user?.username) {
        const result = await toggleFollow(username, 'status')
        if (result.success) {
          setIsFollowing(result.isFollowing)
          setFollowerCount(result.totalFollowers)
          setFollowStatus((prev) => ({
            ...prev,
            [username]: result.isFollowing,
          }))
        }
      }
    }
    checkFollowStatus()
  }, [username, session, setFollowStatus])

  const handleFollowToggle = async () => {
    if (session?.user?.username) {
      const result = await toggleFollow(username, 'toggle')
      if (result.success) {
        setIsFollowing(result.isFollowing)
        setFollowerCount(result.totalFollowers)
        setFollowStatus((prev) => ({ ...prev, [username]: result.isFollowing }))
      }
    }
  }

  return (
    <div className='p-1 m-1'>
      <Card className='bg-gray-800'>
        <CardHeader className='m-1 pb-0'>
          <div className='flex justify-between items-start'>
            <div>
              {displayName && <CardTitle>{displayName}</CardTitle>}
              <div>@{username}</div>
              <div className='pt-5 mb-5'>
                {bio && <CardDescription>{bio}</CardDescription>}
                <CardDescription className='mb-1 mt-0'>
                  joined {joinDate}
                </CardDescription>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <Avatar className='h-16 w-16 mb-2'>
                <AvatarImage src={imageURL} alt='Profile Picture' />
                <AvatarFallback>
              {username.slice(0, 3).toUpperCase()}
            </AvatarFallback>
              </Avatar>
              {session?.user?.username &&
                session.user.username !== username && (
                  <Button
                    onClick={handleFollowToggle}
                    className='text-xs px-2 py-1 h-6 mb-1'
                    variant='outline'
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              <p className='text-sm mb-3'>Followers: {followerCount}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default ProfileHead

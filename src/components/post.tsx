'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Separator } from './ui/separator'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { getProfilePicture } from '@/actions/profilepicture/getProfilePicture'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Loader2, Bookmark } from 'lucide-react'
import toggleLike from '@/actions/posts/likePost'
import { toggleSave } from '@/actions/posts/savePost'
import toggleFollow from '@/actions/user/followUser'
import { ObjectId } from 'mongodb'
import { Session } from 'next-auth'
import { useFollowStatus } from '@/contexts/FollowContext'
import { Comments } from './comments'

interface PostProps {
  username: string
  displayName?: string
  title?: string
  textContent?: string
  date: string
  postId: ObjectId // TODO change to string, also in feed
  session?: Session
}

const Post = ({
  username,
  title,
  textContent,
  date,
  postId,
  session,
}: PostProps) => {
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined)
  const [likeCount, setLikeCount] = useState<number | undefined>(undefined)
  const [isSaved, setIsSaved] = useState<boolean | undefined>(undefined)
  const { followStatus, setFollowStatus } = useFollowStatus()
  const isFollowing = followStatus[username]
  const [followerCount, setFollowerCount] = useState<number | undefined>(
    undefined,
  )
  const isCurrentUser = session?.user?.username === username
  const fetchProfilePicture = async () => {
    try {
      const base64Image = await getProfilePicture(username)
      if (base64Image) {
        setImageURL(base64Image)
      }
    } catch (error) {
      // console.error('Error fetching profile picture:', error) TODO remove
    }
  }

  useEffect(() => {
    fetchProfilePicture()
  }, [username])

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const result = await toggleLike(postId)
        setIsLiked(result.isLiked)
        setLikeCount(result.totalLikes)
      } catch (error) {
        // console.error('Error fetching like status:', error)
      }
    }
    fetchLikeStatus()
  }, [postId])

  useEffect(() => {
    const fetchSaveStatus = async () => {
      try {
        const result = await toggleSave(postId.toString(), 'status')
        if (result) {
          setIsSaved(result.isSaved)
        }
      } catch (error) {
        // console.error('Error fetching save status:', error)
      }
    }
    fetchSaveStatus()
  }, [postId])

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const result = await toggleFollow(username, 'status')
      if (result.success) {
        setFollowStatus((prev) => ({ ...prev, [username]: result.isFollowing }))
        setFollowerCount(result.totalFollowers)
      }
    }
    fetchFollowStatus()
  }, [username, setFollowStatus])

  const handleFollowToggle = async () => {
    const result = await toggleFollow(username, 'toggle')
    if (result.success) {
      setFollowStatus((prev) => ({ ...prev, [username]: result.isFollowing }))
      setFollowerCount(result.totalFollowers)
    }
  }

  const handleLikeClick = useCallback(async () => {
    const result = await toggleLike(postId, 'toggle')
    if (result.success) {
      setIsLiked(result.isLiked)
      setLikeCount(result.totalLikes)
    }
  }, [postId])

  const handleSaveClick = useCallback(async () => {
    const result = await toggleSave(
      postId.toString(),
      isSaved ? 'unsave' : 'save',
    )
    if (result && result.success) {
      setIsSaved(result.isSaved)
    }
  }, [postId, isSaved])

  return (
    <Card className='mb-3 ml-3 mr-3'>
      <div className='flex items-center justify-between p-4'>
        <div className='pt-2 pl-2 pb-1'>
          {username && (
            <div>
              <Link className='font-semibold' href={`/user/${username}`}>
                @{username}
              </Link>
              {title && ': ' + title}
            </div>
          )}
        </div>
        <div className='flex flex-col items-center'>
          <Avatar className='h-12 w-12 mb-2'>
            <AvatarImage src={imageURL} alt='Profile Picture' />
            <AvatarFallback>
              {username.slice(0, 3).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {session && !isCurrentUser && !isFollowing && (
            <Button
              onClick={handleFollowToggle}
              className='text-xs px-2 py-1 h-6'
              disabled={isFollowing === undefined}
              variant='outline'
            >
              Follow
            </Button>
          )}
        </div>
      </div>
      <Separator className=''></Separator>
      {textContent && (
        <CardContent className='p-4 pb-2'>{textContent}</CardContent>
      )}

      <CardFooter className='px-4 py-2 flex justify-between items-center'>
        <div className='flex space-x-2'>
          <Button
            variant='ghost'
            size='default'
            onClick={handleLikeClick}
            disabled={isLiked === undefined}
          >
            {isLiked === undefined ? (
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : (
              <Heart
                className={`mr-2 h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`}
              />
            )}
            Like ({likeCount ?? '...'})
          </Button>
          <Comments postId={postId.toString()} session={session} />
          <Button
            variant='ghost'
            size='default'
            onClick={handleSaveClick}
            disabled={isSaved === undefined}
          >
            {isSaved === undefined ? (
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
            ) : (
              <Bookmark
                className={`mr-2 h-5 w-5 ${isSaved ? 'fill-current text-blue-500' : ''}`}
              />
            )}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
        <div className='text-sm text-gray-500'>
          {new Date(date).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  )
}

export default Post

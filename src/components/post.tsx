'use client'
import React, { useEffect, useState } from 'react'
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
import { Button } from './ui/button'
import { Heart, MessageCircle, Loader2 } from 'lucide-react'
import toggleLike from '@/actions/posts/likePost'
import { ObjectId } from 'mongodb'

interface PostProps {
  username: string
  displayName?: string
  title?: string
  textContent?: string
  date: string
  postId: ObjectId
}

const Post = ({ username, title, textContent, date, postId }: PostProps) => {
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined)
  const [likeCount, setLikeCount] = useState<number | undefined>(undefined)

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

  useEffect(() => {
    fetchProfilePicture()
  }, [])

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const result = await toggleLike(postId)
      setIsLiked(result.isLiked)
      setLikeCount(result.totalLikes)
    }
    fetchLikeStatus()
  }, [postId])

  const handleLikeClick = async () => {
    const result = await toggleLike(postId)
    if (result.success) {
      setIsLiked(result.isLiked)
      setLikeCount(result.totalLikes)
    }
  }
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
        <Avatar className='h-12 w-12 ml-4'>
          <AvatarImage src={imageURL} alt='Profile Picture' />
          <AvatarFallback>:)</AvatarFallback>
        </Avatar>
      </div>
      <Separator className=''></Separator>

      {textContent && (
        <CardContent className='p-4 pb-2'>{textContent}</CardContent>
      )}

      <CardFooter className='px-4 py-2 flex justify-between items-center'>
        <div className='flex space-x-2'>
          <Button variant="ghost" size="default" onClick={handleLikeClick} disabled={isLiked === undefined}>
            {isLiked === undefined ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Heart className={`mr-2 h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            )}
            Like ({likeCount ?? '...'})
          </Button>
          <Button variant="ghost" size="default">
            <MessageCircle className="mr-2 h-5 w-5" />
            Comment
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

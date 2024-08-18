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

interface PostProps {
  username: string
  displayName?: string
  title?: string
  textContent?: string
  date: string
}

const Post = ({ username, title, textContent, date }: PostProps) => {
  const [imageURL, setImageURL] = useState<string | undefined>(undefined)
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

      {textContent && <CardContent className='p-4'>{textContent}</CardContent>}

      <CardDescription className='p-4'>
        {new Date(date).toLocaleDateString()}
      </CardDescription>
    </Card>
  )
}

export default Post

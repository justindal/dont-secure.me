import React from 'react'
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

interface PostProps {
  username: string
  displayName?: string
  title?: string
  textContent?: string
  date: string
}

const Post = ({ username, title, textContent, date }: PostProps) => {
  return (
    <Card className='mb-3 ml-3 mr-3'>
      <div className='pt-2 pl-2 pb-1'>
        {username && (
          <div>
            <Link className='font-semibold' href={`/user/${username}`}>@{username}</Link>
            {title && ': ' + title}
          </div>
        )}
      </div>
      <Separator className=''></Separator>

      {textContent && <CardContent className='p-4'>{textContent}</CardContent>}

      <CardDescription className='p-4'>{date}</CardDescription>
    </Card>
  )
}

export default Post

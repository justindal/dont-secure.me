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

interface PostProps {
  username: string
  displayName?: string
  title?: string
  textContent?: string
  date: string
}

const Post = ({
  username,
  title,
  textContent,
  date,
}: PostProps) => {
  return (
    <Card className='m-4'>
      <div className='pt-2 pl-2 pb-1'>
        {username && (
          <div>
            <span className="font-semibold">@{username}</span>
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

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
  displayName,
  title,
  textContent,
  date,
}: PostProps) => {
  return (
    <Card className='m-4'>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {displayName && <CardContent>{displayName}</CardContent>}
        {username && <CardContent>{'@' + username}</CardContent>}
      </CardHeader>
      <CardFooter>
        {textContent && <CardDescription>{textContent}</CardDescription>}
      </CardFooter>
      <CardContent>{date}</CardContent>
    </Card>
  )
}

export default Post

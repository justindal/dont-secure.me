import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
      <CardContent>
        {textContent && <CardDescription>{textContent}</CardDescription>}
      </CardContent>
      <CardFooter>{date}</CardFooter>
    </Card>
  )
}

export default Post

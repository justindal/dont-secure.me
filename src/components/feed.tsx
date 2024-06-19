import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Post from './post'
import { Separator } from './ui/separator'

const Feed = () => {
  return (
    <ScrollArea className='h-[90vh] w-[450px] rounded-md'>
      <Post
        username='justin'
        title='first post'
        date='today'
        textContent='hello this is a post'
      ></Post>

      <Separator></Separator>

      <Post
        username='notjustin'
        title='another post'
        date='yesterday'
        textContent='hello this is a super cool post'
      ></Post>
      <Separator></Separator>

      <Post
        username='justin'
        title='first post'
        date='today'
        textContent='hello this is a post'
      ></Post>
      <Separator></Separator>

      <Post
        username='notjustin'
        title='another post'
        date='yesterday'
        textContent='hello this is a super cool post'
      ></Post>
      <Separator></Separator>

      <Post
        username='justin'
        title='first post'
        date='today'
        textContent='hello this is a post'
      ></Post>
      <Separator></Separator>

      <Post
        username='notjustin'
        title='another post'
        date='yesterday'
        textContent='hello this is a super cool post'
      ></Post>
    </ScrollArea>
  )
}

export default Feed

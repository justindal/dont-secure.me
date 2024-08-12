import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Post from './post'

/**
 * @interface FeedProps
 * @param {string} feedType - the type of feed to display, either 'following' or 'user'
 * @param {string} feedUsername - the username of the user to display the feed for
 */
interface FeedProps {
  feedType: string
  feedUsername?: string
}

const Feed = ({ feedType, feedUsername }: FeedProps) => {
  return (
    <ScrollArea className='h-[90vh] w-[500px] rounded-md'>
      <Post
        username='justin'
        displayName='justin dal'
        title='first post'
        date='today'
        textContent='hello this is a post'
      ></Post>

      <Post
        username='notjustin'
        date='yesterday'
        textContent='hello this is a super cool post'
      ></Post>

      <Post
        username='also justin'
        title='my cool post post'
        date='a long time ago'
        textContent='oh wow! a post!'
      ></Post>

      <Post
        username='justins dog'
        title='amazing post'
        date='just now'
        textContent='ruff ruff!'
      ></Post>

      <Post
        username='davidcao'
        title='wow!'
        date='today'
        textContent='hello im david'
      ></Post>

      <Post
        username='justind'
        title='this is a post'
        date='moments ago'
        textContent='i posted this post'
      ></Post>
    </ScrollArea>
  )
}

export default Feed

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Post from './post'
import { followingFeed, homeFeed, userFeed } from '@/actions/feed/getFeed'

/**
 * @interface FeedProps
 * @param {string} feedType - the type of feed to display, either 'following', 'home', or 'profile'
 * @param {string} feedUsername - the username of the user to display the feed for
 */
interface FeedProps {
  feedType: string
  feedUsername?: string
}

const Feed = async ({ feedType, feedUsername }: FeedProps) => {
  async function getFollowingFeed() {
    // TODO: Implement the logic to fetch and return JSX for the following feed
    const feed = await followingFeed()

    return <div>Following feed placeholder</div>
  }

  async function getHomeFeed() {
    // TODO: Implement the logic to fetch and return JSX for the home feed
    const feed = await homeFeed()

    if ('error' in feed) {
      return <div>Error: {feed.error}</div>
    }

    return (
      <>
        {feed.map((post) => (
          <Post
            key={post._id.toString()}
            username={post.username}
            title={post.title}
            textContent={post.description}
            date={post.date.toString()} // TODO fix time formatting
          />
        ))}
      </>
    )
  }

  async function getUserFeed(feedUsername: string) {
    // TODO: Implement the logic to fetch and return JSX for the user feed
    const feed = await userFeed(feedUsername)
    console.log(feed)
    if ('error' in feed) {
      return <div>Error: {feed.error}</div>
    }

    return (
      <>
        {feed.map((post) => (
          <Post
            key={post._id.toString()}
            username={post.username}
            title={post.title}
            textContent={post.description}
            date={post.date.toString()} // TODO fix time formatting
          />
        ))}
      </>
    )
  }

  return (
    <ScrollArea className='h-[90vh] w-[500px] rounded-md'>
      {
        // TODO testing, remove
        feedType === 'test' && (
          <div>
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
          </div>
        )
      }

      {
        // feed for specific user
        feedUsername && feedType === 'user' && getUserFeed(feedUsername)
      }

      {
        // feed for following
        feedType === 'following' && getFollowingFeed()
      }

      {
        // feed for home
        feedType === 'home' && getHomeFeed()
      }
    </ScrollArea>
  )
}

export default Feed

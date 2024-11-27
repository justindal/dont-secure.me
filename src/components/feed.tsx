import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Post from '@/components/post'
import UserCard from '@/components/usercard'
import {
  followingFeed,
  homeFeed,
  userFeed,
  savedFeed,
  searchUsersFeed,
  searchPostFeed,
} from '@/actions/feed/getFeed'
import { ObjectId } from 'mongodb'

import { FollowProvider } from '@/contexts/FollowContext'

import { auth } from '@/auth'

/**
 * @interface FeedProps
 * @param {string} feedType - the type of feed to display, either 'following', 'home', or 'profile'
 * @param {string} feedUsername - the username of the user to display the feed for
 */
interface FeedProps {
  feedType: string
  feedUsername?: string
  searchTerm?: string
}

const Feed = async ({ feedType, feedUsername, searchTerm }: FeedProps) => {
  const session = await auth()

  async function getFollowingFeed() {
    const feed = await followingFeed()

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
            date={post.date.toString()}
            postId={post._id}
            session={session || undefined}
          />
        ))}
      </>
    )
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
            date={post.date.toString()}
            postId={post._id}
            session={session || undefined}
          />
        ))}
      </>
    )
  }

  async function getUserFeed(feedUsername: string) {
    // TODO: Implement the logic to fetch and return JSX for the user feed
    const feed = await userFeed(feedUsername)
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
            date={post.date.toString()}
            postId={post._id}
          />
        ))}
      </>
    )
  }

  async function getSavedFeed() {
    const feed = await savedFeed()
    if ('error' in feed) {
      return <div>Error: {feed.error}</div>
    }

    if (feed.length === 0) {
      return (
        <div className='text-center p-4'>
          You haven&apos;t saved any posts yet.
        </div>
      )
    }

    return (
      <>
        {feed?.map(
          (post) =>
            post && (
              <Post
                key={post._id.toString()}
                username={post.username}
                title={post.title}
                textContent={post.description}
                date={post.date.toString()}
                postId={post._id}
                session={session || undefined}
              />
            ),
        )}
      </>
    )
  }

  async function getSearchUsersFeed(searchTerm: string) {
    const feed = await searchUsersFeed(searchTerm)
    if ('error' in feed) {
      return <div>Error: {feed.error}</div>
    }
    if (feed.length === 0) {
      return <div className='text-center p-4'>No users found.</div>
    }
    if (!session) {
      return (
        <div className='text-center p-4'>Please sign in to view users.</div>
      )
    }
    return (
      <>
        {feed.map((user) => (
          <UserCard
            key={user._id.toString()}
            username={user.username}
            bio={user.bio}
            session={session}
          />
        ))}
      </>
    )
  }

  async function getSearchPostFeed(searchTerm: string) {
    const feed = await searchPostFeed(searchTerm)
    if ('error' in feed) {
      return <div>Error: {feed.error}</div>
    }
    if (feed.length === 0) {
      return <div className='text-center p-4'>No posts found.</div>
    }
    return (
      <>
        {feed.map((post) => (
          <Post
            key={post._id.toString()}
            username={post.username}
            title={post.title}
            textContent={post.description}
            date={post.date.toString()}
            postId={post._id}
          />
        ))}
      </>
    )
  }

  return (
    <FollowProvider>
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
                postId={new ObjectId()}
              ></Post>

              <Post
                username='notjustin'
                date='yesterday'
                textContent='hello this is a super cool post'
                postId={new ObjectId()}
              ></Post>

              <Post
                username='also_justin'
                title='my cool post post'
                date='a long time ago'
                textContent='oh wow! a post!'
                postId={new ObjectId()}
              ></Post>

              <Post
                username='justins_dog'
                title='amazing post'
                date='just now'
                textContent='ruff ruff!'
                postId={new ObjectId()}
              ></Post>

              <Post
                username='davidcao'
                title='wow!'
                date='today'
                textContent='hello im david'
                postId={new ObjectId()}
              ></Post>

              <Post
                username='justind'
                title='this is a post'
                date='moments ago'
                textContent='i posted this post'
                postId={new ObjectId()}
              ></Post>
            </div>
          )
        }

        {
          // feed for specific user
          feedUsername && feedType === 'user' && getUserFeed(feedUsername)
        }
        {
          feedType === 'following' && getFollowingFeed()
        }
        {
          // feed for home
          feedType === 'home' && getHomeFeed()
        }

        {
          // feed for saved
          feedType === 'saved' && getSavedFeed()
        }

        {
          // feed for search
          searchTerm &&
            feedType === 'searchUser' &&
            getSearchUsersFeed(searchTerm)
        }

        {
          // feed for search
          searchTerm &&
            feedType === 'searchPosts' &&
            getSearchPostFeed(searchTerm)
        }
      </ScrollArea>
    </FollowProvider>
  )
}

export default Feed

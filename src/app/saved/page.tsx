import React from 'react'

import { auth } from '@/auth'

import HomeNav from '@/components/homenavigation'
import HomeSuggestedCard from '@/components/suggestedcard'
import Panel from '@/components/userpanel'
import NewPost from '@/components/newpost'
import Feed from '@/components/feed'

import { Separator } from '@/components/ui/separator'

const page = async () => {
  const session = await auth()
  if (!session) {
    return <div>Not logged in</div>
  }
  return (
    <div>
      <HomeNav></HomeNav>
      <main>
        <div className='flex justify-center space-x-12 pt-1'>
          <div className='w-[350px]'>
            <HomeSuggestedCard></HomeSuggestedCard>
          </div>
          <div>
            <Separator orientation='vertical'></Separator>
          </div>
          <div>
            <p className='text-4xl font-bold mb-7'>Saved Posts</p>
            <Feed feedType='saved'></Feed>
          </div>
          <div>
            <Separator orientation='vertical'></Separator>
          </div>
          <div className='w-[350px]'>
            <Panel session={session}></Panel>
          </div>
        </div>
        <NewPost session={session}></NewPost>
      </main>
    </div>
  )
}

export default page

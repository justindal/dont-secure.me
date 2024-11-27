import React from 'react'
import db from '@/lib/db'
import Feed from '@/components/feed'
import HomeNav from '@/components/homenavigation'
import HomeSuggestedCard from '@/components/suggestedcard'
import { Separator } from '@/components/ui/separator'
import NewPost from '@/components/newpost'
import Panel from '@/components/userpanel'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { auth } from '@/auth'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const searchTerm = searchParams.search || ''

  const searchResults = await db.getUser(searchTerm)
  const session = await auth()
  if (!session) {
    return
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
            {/* Search content goes here */}
            <div className='container mx-auto py-8 flex flex-col items-center'>
              <h1 className='text-2xl font-bold mb-4 text-center'>
                Search Results
              </h1>
              <Tabs defaultValue='users' className='w-[550px]'>
                <TabsList className='flex justify-center'>
                  <TabsTrigger value='users' className='w-full'>
                    Users
                  </TabsTrigger>
                  <TabsTrigger value='posts' className='w-full'>
                    Posts
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='users'>
                  <div className='mt-8'>
                    {searchResults ? (
                      <Feed feedType='searchUser' searchTerm={searchTerm} />
                    ) : (
                      <p>No results found for &quot;{searchTerm}&quot;</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value='posts'>
                  <div className='mt-8'>
                    {searchResults ? (
                      <Feed feedType='searchPosts' searchTerm={searchTerm} />
                    ) : (
                      <p>No results found for &quot;{searchTerm}&quot;</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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

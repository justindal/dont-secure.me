import { auth } from '@/auth'
import { UnauthorizedAlert } from '@/components/unauthorized'
import HomeNav from '@/components/homenavigation'
import HomeSuggestedCard from '@/components/suggestedcard'
import Feed from '@/components/feed'
import Panel from '@/components/userpanel'
import { Separator } from '@/components/ui/separator'

import NewPost from '@/components/newpost'

export default async function Page() {
  const session = await auth()
  console.log(session)
  if (!session) return UnauthorizedAlert()

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
            <Feed feedType='following'></Feed>
            {
              // TODO update feedType
            }
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

'use server'

import checkUser from '@/actions/user/checkUser'
import { auth } from '@/auth'
import HomeSuggestedCard from '@/components/suggestedcard'
import HomeNav from '@/components/homenavigation'
import ProfileHead from '@/components/profilehead'
import Feed from '@/components/feed'
import { Separator } from '@/components/ui/separator'
import Panel from '@/components/userpanel'
import NewPost from '@/components/newpost'

import { UnauthorizedAlert } from '@/components/unauthorized'

const Page = async ({ params }: { params: { user: string } }) => {
  const session = await auth()
  if (!session) return UnauthorizedAlert()
  const user = await checkUser(params.user)
  if (!user) return <div>no user</div>
  console.log('User data:', user) // Debug log

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
            <ProfileHead
              username={user.username}
              displayName={user.name}
              bio={user.bio}
              joinDate={new Date(user.date).toLocaleDateString()}
              session={session}
            />
            <Feed feedType='user' feedUsername={user.username}></Feed>{' '}
            {
              // TODO feedType
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

export default Page

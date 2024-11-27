import { auth } from '@/auth'

import HomeNav from '@/components/homenavigation'
import HomeSuggestedCard from '@/components/suggestedcard'
import ProfileHead from '@components/profilehead'
import Panel from '@/components/userpanel'
import Feed from '@/components/feed'
import { Separator } from '@/components/ui/separator'
import { UnauthorizedAlert } from '@/components/unauthorized'
import NewPost from '@/components/newpost'

const page = async () => {
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
            <ProfileHead
              username={session.user.username}
              displayName={session.user.name}
              bio={session.user.bio}
              joinDate={new Date(session.user.date).toLocaleDateString()}
            ></ProfileHead>
            <Feed feedType='user' feedUsername={session.user.username}></Feed>{' '}
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

export default page

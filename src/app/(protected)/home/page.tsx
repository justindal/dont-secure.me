import { auth } from '@/auth'
import { UnauthorizedAlert } from '@/components/unauthorized'
import HomeNav from '@/components/homenavigation'
import HomeSuggestedCard from '@/components/suggestedcard'

import { Separator } from '@/components/ui/separator'

export default async function Page() {
  const session = await auth()
  if (!session) return UnauthorizedAlert()

  return (
    <div>
      <HomeNav></HomeNav>
      <main>
        <div className='flex items-center justify-center space-x-5'>
          <HomeSuggestedCard></HomeSuggestedCard>
          <Separator orientation='vertical'></Separator>
          <HomeSuggestedCard></HomeSuggestedCard>
          <Separator orientation='vertical'></Separator>
          <HomeSuggestedCard></HomeSuggestedCard>
        </div>
      </main>
    </div>
  )
}

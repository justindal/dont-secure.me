import { auth } from '@/auth'
import { UnauthorizedAlert } from '@/components/unauthorized'
import HomeNav from '@/components/homenavigation'

export default async function Page() {
  const session = await auth()
  if (!session) return UnauthorizedAlert()

  return (
    <div>
      <HomeNav></HomeNav>
      <main>hello</main>
    </div>
  )
}

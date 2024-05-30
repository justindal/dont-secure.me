import { auth } from '@/auth'
import { UnauthorizedAlert } from '@/components/unauthorized'

export default async function Page() {
  const session = await auth()
  if (!session) return UnauthorizedAlert()

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

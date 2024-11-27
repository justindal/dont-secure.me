import { auth } from '@/auth'
import { UnauthorizedAlert } from '@/components/unauthorized'
import HomeNav from '@/components/homenavigation'
import Panel from '@/components/userpanel'
import { Separator } from '@/components/ui/separator'
import { ProfileEditForm } from '@/components/profileditform'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default async function SettingsPage() {
  const session = await auth()
  if (!session) return UnauthorizedAlert()

  return (
    <div>
      <HomeNav />
      <main>
        <div className='flex justify-center space-x-12 pt-1'>
          <div className='w-[350px]'>
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Separator orientation='vertical' />
          </div>
          <div className='w-[600px]'>
            <Card className='p-6'>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <ProfileEditForm 
                initialName={session.user.name}
                initialBio={session.user.bio || ''}
                username={session.user.username}
              />
            </Card>
          </div>
          <div>
            <Separator orientation='vertical' />
          </div>
          <div className='w-[350px]'>
            <Panel session={session} />
          </div>
        </div>
      </main>
    </div>
  )
}
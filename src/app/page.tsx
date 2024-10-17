import LoginForm from '@components/loginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

export default async function Home() {
  const session = await auth()
  if (session) {
    redirect('/home')
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-row items-center max-w-4xl mx-auto'>
        <div className='flex flex-col items-center p-6 max-w-md'>
          <h1 className='text-3xl font-bold mb-4'>don&apos;t-secure.me</h1>
          <p className='text-center'>an unsecured social media platform. please log in to continue.</p>
        </div>

        <Separator orientation='vertical' className='h-48 bg-gray-400 mx-4'></Separator> {/* Set explicit height */}

        <div className='flex flex-col items-center p-6 max-w-md'>
          <h1 className='text-3xl font-bold mb-4'>sign in</h1>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

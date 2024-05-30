import Navbar from '@components/Navbar'
import Loginform from '@/components/loginform'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session) {
    redirect('/home')
  }

  return (
    <div>
      <Navbar></Navbar>
      <main className='flex min-h-screen flex-col items-center p-24'>
        <h1 className='text-4xl font-bold mb-7'>sign in</h1>
        <Loginform></Loginform>
      </main>
    </div>
  )
}

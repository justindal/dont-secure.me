import Navbar from '@components/Navbar'
import SignIn from './components/sign-in'

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1 className='text-4xl font-bold'>sign in</h1>
        <SignIn></SignIn>
      </main>
    </div>
  )
}

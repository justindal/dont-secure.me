import Navbar from '@components/Navbar'
import SignIn from './components/sign-in'

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <main className='flex min-h-screen flex-col items-center p-24'>
        <h1 className='text-4xl font-bold mb-7'>sign in</h1>
        <SignIn></SignIn>
      </main>
    </div>
  )
}

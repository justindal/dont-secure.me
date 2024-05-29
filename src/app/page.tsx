import Navbar from '@components/Navbar'
import Loginform from '@/components/loginform'

export default function Home() {
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

'use client'

import Link from 'next/link'
import SearchBar from './searchbar'
import { LockOpen } from 'lucide-react'

const HomeNav = () => {
  return (
    <nav className='inset-x-0 top-0 z-50 relative mb-2'>
      <div className='w-full mx-auto px-4'>
        <div className='flex h-14 justify-between'>
          <div className='flex items-center'>
            <Link className='flex items-center' href='#'>
              <LockOpen className='h-6 w-6 text-blue-500' />
            </Link>
          </div>
          <div className='flex justify-center items-center'>
            <nav className='hidden md:flex gap-4 absolute left-1/2 transform -translate-x-1/2'>
              <Link
                className='font-medium flex items-center text-sm transition-colors hover:underline'
                href='/following'
              >
                Following
              </Link>
              <Link
                className='font-medium flex items-center text-sm transition-colors hover:underline'
                href='/home'
              >
                Feed
              </Link>

              {/* <Link
                className='font-medium flex items-center text-sm transition-colors hover:underline'
                href='/messages'
              >
                Messages
              </Link> */}
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNav

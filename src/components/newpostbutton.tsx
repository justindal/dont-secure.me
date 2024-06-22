import React from 'react'
import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'

const NewPostButton = () => {
  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <Button className='flex items-center space-x-5 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
        <SquarePlus />
        New Post
      </Button>
    </div>
  )
}

export default NewPostButton

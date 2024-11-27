'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) setSearchTerm(search)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className='flex w-full max-w-sm items-center space-x-2'>
      <Input 
        type='search' 
        placeholder='users, posts, tags...' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type='submit'>search</Button>
    </form>
  )
}

export default SearchBar

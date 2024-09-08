import React from 'react'
import db from '@/lib/db'
import SearchBar from '@/components/searchbar'
import Feed from '@/components/feed'


export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const searchTerm = searchParams.search || ''

  const searchResults = await db.getUser(searchTerm)

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-4'>Search Results</h1>
      <SearchBar />
      <div className='mt-8'>
        {searchResults ? (
          <Feed feedType='search' feedUsername={searchResults.username} />
        ) : (
          <p>No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  )
}

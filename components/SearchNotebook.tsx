'use client'

import React from 'react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchProps {
  query: string
}

const SearchNotebook = ({ query }: SearchProps) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set(`${query}`, term)
    } else {
      params.delete(`${query}`)
    }
    try {
      replace(`/dashboard?${params.toString()}`)
    } catch (error) {
      console.error('Failed to replace URL parameters:', error)
    }
  }

  return (
    <div className='relative flex items-center'>
      <Input
        type='search'
        name='name'
        placeholder='Look for the notebook'
        className=' w-[243px] h-[38px] bg-secondary rounded-none text-[12px] focus-visible:ring-[3px]'
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(query)?.toString()}
      />
      <span className='absolute top-1/2 translate-y-[-50%] right-6'>🔍</span>
    </div>
  )
}

export default SearchNotebook
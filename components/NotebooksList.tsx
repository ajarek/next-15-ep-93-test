'use client'
import React, { ChangeEvent, useState } from 'react'
import { Input } from './ui/input';

const NotebooksList = ({notebooksData}: {notebooksData: { _id: string; name: string }[]}) => {
  const [search, setSearch] = useState('')
  const filteredNotebooks = notebooksData?.filter((notebook) =>
    notebook.name.toLowerCase().includes(search.toLowerCase())
  )
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }


  return (
     <div className='flex flex-col gap-4 p-4'>
         
          {notebooksData?.length === 0 && (
            <p className='text-red-500'>No notebooks found</p>

          )}
          <div className='p-4 space-y-4'>
          <h2>Number of notebooks {notebooksData?.length}</h2>
        </div>
         <Input type='search' placeholder='Search notebooks' value={search} onChange={handleSearch} />

 <p>Notebook list:</p>
          {filteredNotebooks?.map((notebook: { _id: string; name: string }) => (
            <div
              key={notebook._id}
              className='font-semibold space-y-2'
            >
              {notebook.name}
            </div>
          ))}
        </div>
  )
}

export default NotebooksList
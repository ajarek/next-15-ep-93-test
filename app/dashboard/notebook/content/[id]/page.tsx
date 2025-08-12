import Navbar from '@/components/Navbar'
import RichTextEditor from '@/components/Rich-text-editor'
import React from 'react'

const Content = async ({ params }: { params: { id: string } }) => {
  const {id} = await params
  return (
    <div className=' min-h-screen flex flex-col justify-start items-center gap-4 '>
      <Navbar label=' > Notebook > Content'/>
      <h1 className="text-2xl font-bold mb-6">Content {id}</h1>
      <RichTextEditor noteId={id} />
      </div>

  )
}

export default Content
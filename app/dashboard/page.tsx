import React from 'react'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'

import CreateNotebook from '@/components/CreateNotebook'
import { getNotebooks } from '@/lib/action'
import KanbanNotebooks from '@/components/KanbanNootebooks'

type Notebook = {
  _id: string
  name?: string
}

const Dashboard = async () => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }
  // Pobierz notebooki i przekształć je na proste obiekty JavaScript
  const notebooksData = await getNotebooks(session.user?.id || '')
  // Konwersja obiektów MongoDB na proste obiekty JavaScript
  const Notebooks = notebooksData ? notebooksData.map((notebook: Notebook) => ({
    _id: notebook._id.toString(),
    name: notebook.name
  })) : []
  return (
    <div className=' min-h-screen flex flex-col justify-start items-center gap-4 '>
      <Navbar label=''/>

      <div className='w-full h-full flex flex-col justify-start items-start gap-4 px-4'>
        <h1>Notebooks</h1>
        <CreateNotebook session={session} />
        <KanbanNotebooks notebooks={Notebooks.map((notebook, index) => ({
          key: index,

          _id: notebook._id,
          name: notebook.name || '' // Ensure name is always a string
        }))} />

       
      </div>
    </div>
  )
}

export default Dashboard

import React from 'react'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/Sign-out'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle'
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
      <div className='w-full h-16 flex items-center justify-between  border-b-2 px-4'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger />
          <h2 className='text-sm '>Dashboard</h2>
        </div>
        <div className='flex items-center gap-4'>
          <p className='max-sm:hidden '>{session.user?.name || 'User'}</p>
          <Image
            src={
              session.user?.image ||
              'https://randomuser.me/api/portraits/men/0.jpg'
            }
            alt={session.user?.name || 'User'}
            width={40}
            height={40}
            className='rounded-full'
          />
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
      <div className='w-full h-full flex flex-col justify-start items-start gap-4 px-4'>
        <h1>Notebooks</h1>
        <CreateNotebook session={session} />
        <KanbanNotebooks notebooks={Notebooks.map(notebook => ({
          _id: notebook._id,
          name: notebook.name || '' // Ensure name is always a string
        }))} />

       
      </div>
    </div>
  )
}

export default Dashboard

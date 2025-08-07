import React from 'react'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/Sign-out'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle'
import CreateNotebook from '@/components/CreateNotebook'
import { getNotebooks } from '@/lib/action'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Notebook = {
  _id: string
  name?: string
}

const Dashboard = async () => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }
  const Notebooks = (await getNotebooks(session.user?.id || '')) as Notebook[]
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
        <div className='w-full grid grid-cols-3 gap-4'>

          {Notebooks.map((note: Notebook) => (
            <div key={note._id.toString()} className='w-full min-h-64 flex flex-col items-center justify-between gap-4 p-4 bg-teal-300 shadow-xl rounded-sm' >
              <Link href={`/notebook/${note._id}`} className='text-black'>{note.name || ''}</Link>
              <div className='w-full flex items-center justify-between'>

              <Button className='bg-blue-500'>Edit</Button>
              <Button variant={'destructive'}>Delete</Button>

              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

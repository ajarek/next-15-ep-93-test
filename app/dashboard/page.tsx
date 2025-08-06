/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/Sign-out'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle'
import CreateNotebook from '@/components/CreateNotebook'
import { getNotebooks } from '@/lib/action'
import Link  from 'next/link'
const Dashboard = async () => {
  const session = await auth()
  console.log(session)
  if (!session) {
    redirect('/')
  }
  const Notebooks = (await getNotebooks(session.user?.id || '')) as string[]
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
        <div>
          
          {Notebooks.map((note: any) => (
            <div key={note._id.toString()}>
              <Link href={`/notebook/${note._id}`}>
                {note.name || ''}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

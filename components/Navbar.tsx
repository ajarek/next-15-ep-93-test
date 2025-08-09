import React from 'react'
import SignOutButton from '@/components/Sign-out'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle'
import { auth } from '@/app/api/auth/auth'
import  Link  from 'next/link'

const Navbar = async ({label}: {label: string}) => {
  const session = await auth()
  return (
    <div className='w-full h-16 flex items-center justify-between  border-b-2 px-4'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger />
          <h2 className='text-sm flex items-center gap-2'>

            <Link href={`/dashboard`}>Dashboard</Link>
            <Link href={`#`}>{label}</Link>
          </h2>
        </div>
        <div className='flex items-center gap-4'>
          <p className='max-sm:hidden '>{session?.user?.name || 'User'}</p>
          <Image
            src={
              session?.user?.image ||
              'https://randomuser.me/api/portraits/men/0.jpg'
            }
            alt={session?.user?.name || 'User'}
            width={40}
            height={40}
            className='rounded-full'
          />
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
  )
}

export default Navbar
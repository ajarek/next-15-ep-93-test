import React from 'react'
import { auth } from "@/app/api/auth/auth"
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/Sign-out'
import Image from 'next/image'

const Dashboard = async () => {
  const session = await auth()
  console.log(session)
  if(!session){
    redirect('/')
  }
  return (
    <div className= 'min-h-screen flex flex-col justify-center items-center gap-4'>
      <SignOutButton/>
     
     <h1>Dashboard</h1>
     <p>Welcome {session.user?.name || 'User'}</p>
     <p>Email: {session.user?.email || 'No address'}</p>
     <p>Date: {session.expires || 'No expiration'}</p>
     <Image
      src={session.user?.image  || 'https://randomuser.me/api/portraits/men/0.jpg'}
      alt={session.user?.name || 'User'}
      width={100}
      height={100}
      className='rounded-full'
      />
      </div>
  )
}

export default Dashboard
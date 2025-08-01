import React from 'react'
import { auth } from "@/app/api/auth/auth"
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/Sign-out'

const Dashboard = async () => {
  const session = await auth()

  if(!session){
    redirect('/')
  }
  return (
    <div className= 'min-h-screen flex flex-col justify-center items-center gap-4'>
      <SignOutButton/>
     
     <h1>Dashboard</h1>
      </div>
  )
}

export default Dashboard
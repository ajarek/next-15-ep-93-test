import LoginForm from '@/components/Login-form'
import SignIn from '@/components/Sign-in'
import React from 'react'
import { auth } from "@/app/api/auth/auth"
import { redirect } from 'next/navigation'
import SignInGoogle from '@/components/Sign-in-google'

const Login = async () => {
  const session = await auth()
  if(session){
    redirect('/dashboard')
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8 '>
      <h1 className=''>Login</h1>
      <SignIn/>
      <SignInGoogle/>
    </div>
  )
}

export default Login
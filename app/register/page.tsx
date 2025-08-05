import React from 'react'
import RegisterForm from '@/components/Register-form'

const Register = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center '>
      <div className='w-full  max-w-sm flex flex-col border-2 shadow-xl gap-4 p-4 rounded-xl'>
        <h1 className='text-2xl text-center font-bold'>Register</h1>
      <RegisterForm/>
    </div>
    </div>
  )
}

export default Register
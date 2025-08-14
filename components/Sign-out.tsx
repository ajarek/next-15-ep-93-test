import { signOut } from '@/app/api/auth/auth'
import React from 'react'
import { Button } from './ui/button'

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        variant={'destructive'}
        type='submit'
        className='cursor-pointer'
      >
        Sign-out
      </Button>
    </form>
  )
}

export default SignOutButton

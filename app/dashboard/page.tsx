import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className= 'min-h-screen flex flex-col justify-center items-center gap-4'>
      <Button asChild>
      <Link href='/'>Home</Link>
      </Button>
     <h1>Dashboard</h1>
      </div>
  )
}

export default Dashboard
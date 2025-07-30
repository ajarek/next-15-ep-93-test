'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  const router = useRouter()
  return (
    <div className='w-full min-h-[calc(100vh-32px)] flex flex-col items-center justify-center gap-4 p-2'>
     
      <h1 className='text-center text-3xl font-semibold tracking-widest '>
        404 Not Found
      </h1>
      <p className='text-center'>
        Your visited page not found. You may go home page.
      </p>
      <div className=''>
        <Button
          onClick={() => {
            router.push('/')
          }}
          aria-label='Back to home page'
          className='w-full bg-destructive text-white hover:bg-destructive/80 rounded-sm cursor-pointer'
        >
          Back to home page
        </Button>
      </div>
    </div>
  )
}
export default NotFoundPage

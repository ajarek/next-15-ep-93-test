import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-start '>
      <NavBar />
      <div className='flex flex-col gap-4'>
        <h1 className=' text-4xl font-bold   '>Home</h1>
        <Button className=''>Click</Button>
      </div>
    </div>
  )
}

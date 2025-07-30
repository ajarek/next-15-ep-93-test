'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'


const NavBar = () => {
  

  return (
    <nav className="w-full h-16 px-4 md:px-8 flex items-center justify-between border-b bg-background">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/Images/noteforge-logo.png" 
            alt="NoteForge Logo" 
            width={40} 
            height={40} 
          />
          <span className="text-xl font-bold text-primary hidden md:inline">NoteForge</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
       <ModeToggle/>

        <Link href="/dashboard">
          <Button variant="ghost">Login</Button>
        </Link>
        
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
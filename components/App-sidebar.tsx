import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href='/'
          aria-label='home'
          className='flex items-center space-x-2'
        >
          <Image
            src='/images/noteforge-logo.png'
            alt='logo'
            width={60}
            height={60}
          />

          <span className='text-2xl font-bold'>NoteForge</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}

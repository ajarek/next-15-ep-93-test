import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { getNotebooks } from '@/lib/action'
import { auth } from '@/app/api/auth/auth'
import NotebooksList from './NotebooksList'

const AppSidebar = async () => {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const notebooksData = await getNotebooks(session?.user?.id || '')
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
        <NotebooksList notebooksData={notebooksData || []} />

        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar

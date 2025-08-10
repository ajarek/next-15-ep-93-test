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
import SearchNotebook from './SearchNotebook'

const  AppSidebar= async ({searchParams,}: { searchParams: Promise<{ name: string }>}) =>{

const { name } = (await searchParams) || {}
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
        <div className='p-4 space-y-4'>
          <h2>

          Number of notebooks {notebooksData?.length} 
          </h2>
        <SearchNotebook query='name' />
       </div>

        <div className='p-4'>
          <p>Notebook list:</p>
          {notebooksData?.filter((notebook: { name: string }) => notebook.name.toUpperCase().includes(name?.toUpperCase())|| !name) 
          .map((notebook: { _id: string, name: string }) => (
            <div key={notebook._id} className='font-semibold space-y-2'>
              {notebook.name}
            </div>
          ))}
        </div>

        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar

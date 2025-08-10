import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar  from "@/components/App-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar searchParams={Promise.resolve({ name: '' })} />
      <main className="w-full">
        
        {children}
      </main>
    </SidebarProvider>
  )
}
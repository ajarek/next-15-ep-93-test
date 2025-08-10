import React from 'react'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import { deleteNotebook, getNotebookById, updateNotebook } from '@/lib/action'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navbar from '@/components/Navbar'


const columns = [
  { id: '1', name: 'Planned', color: '#6B7280' },
  { id: '2', name: 'In Progress', color: '#F59E0B' },
  { id: '3', name: 'Done', color: '#10B981' },
];

const EditNotebook = async ({ params }: { params: { id: string } }) => {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  
  const notebook = await getNotebookById(params.id)
  
  
  const notebookData = notebook ? {
    _id: notebook._id.toString(),
    name: notebook.name,
    userId: notebook.userId,
    column: notebook.column || '1'
  } : null

  if (!notebookData) {
    return <div>Notebook not found</div>
  }

  return (
    <div className=' min-h-screen flex flex-col justify-start items-center gap-4 '>
      <Navbar label=' > Notebook'/>
      <h1 className="text-2xl font-bold mb-6">Edit Notebook</h1>
      <form action={async (formData: FormData) => {
        'use server'
        await deleteNotebook(formData);
        redirect('/dashboard')
      }}>
         <input type="hidden" name="id" value={notebookData._id} />
        <Button variant="destructive">Delete Notebook</Button>
      </form>
     
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Edit Notebook</CardTitle>
          <CardDescription>Make changes to your notebook here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (formData:FormData) => {
            'use server'
            await updateNotebook(formData);
            redirect('/dashboard')
          }}>
            <input type="hidden" name="id" value={notebookData._id} />
            
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={notebookData.name} />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="column">Status</Label>
                <Select name="column" defaultValue={notebookData.column}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Link href="/dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditNotebook
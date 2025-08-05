import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { addNotebook } from '@/lib/action'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'


const CreateNotebook = (session:Session) => {

 const handleSubmit = async (formData: FormData) => {
  'use server'

    try {
      const Notebook = {
        name: formData.get('name') as string,
        userId: session.user?.id as string ,
       
      }
      
      await addNotebook({
        _id: crypto.randomUUID(),
        name: Notebook.name,
        userId: Notebook.userId,
        
        
      })
    } catch (error) {
      console.error(error)
    } finally {
      redirect('/dashboard')

    }
  }

  return (
    <Dialog>
      <form action={handleSubmit}>

  <DialogTrigger asChild>
    
      <Button className='cursor-pointer'>Create Notebook</Button>
    
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Notebook</DialogTitle>
      <DialogDescription>
        Create a new notebook to store your notes.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="My Notebook" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
  </DialogContent>
  </form>
</Dialog>
  )
}

export default CreateNotebook

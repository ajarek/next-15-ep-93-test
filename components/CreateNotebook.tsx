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
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { addNotebook } from '@/lib/action'
import Form from 'next/form'
import { Session } from 'next-auth'


const CreateNotebook = ({session}: {session: Session}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>Create Notebook</Button>
      </DialogTrigger>
      <DialogContent>
        <Form
        
          action={async (formData: FormData) => {
            'use server'
            const result = await addNotebook(formData)
            if (result?.error) {
              
              return
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Notebook</DialogTitle>
            <DialogDescription>
              Create a new notebook to store your notes.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-3'>
            <input
              type='hidden'
              name='userId'
              value={session.user?.id}
            />
            <Label htmlFor='name-1'>Name</Label>
            <Input
              id='name-1'
              name='name'
              defaultValue='My Notebook'
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='destructive'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit'>Create</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNotebook

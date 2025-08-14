'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { addUser } from '@/lib/action'
import { redirect } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(1, 'User Name is required'),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be valid.',
  }),
  password: z.string().min(1, 'Password is required'),
  img: z.string(),
})

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      img: '',
    },
  })

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const userData = {
        username: formData.username as string,
        email: formData.email as string,
        password: formData.password as string,
        img: (formData.img as string) || 'https://github.com/shadcn.png',
        isAdmin: false,
      }

      await addUser(userData)
    } catch (error) {
      console.error(error)
    } finally {
      redirect('/login')
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Jennie Nichols'
                  {...field}
                />
              </FormControl>
              <FormDescription>User name must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='ajarek@wp.pl'
                  {...field}
                />
              </FormControl>
              <FormDescription>Email must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='********'
                  {...field}
                />
              </FormControl>
              <FormDescription>Password must correct.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='img'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Photo (optional)</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='https://randomuser.me/api/portraits/men/75.jpg'
                  {...field}
                />
              </FormControl>
              <FormDescription>Photo not required.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full cursor-pointer'
        >
          Submit
        </Button>
      </form>
      <div className='flex items-center gap-4'>
        <p>You already have an account?</p>
        <Link
          href='/login'
          className='text-blue-500'
        >
          Login
        </Link>
      </div>
    </Form>
  )
}

export default RegisterForm

'use server'

import connectToDb from './connectToDb'
import { Notebook, User, UserWithoutId } from './models'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { signOut } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

export const addUser = async (formData: UserWithoutId) => {
  const { username, email, password, img, isAdmin } = formData
  const hashedPassword = await bcrypt.hash(password, 5)
  try {
    connectToDb()
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
    })
    console.log(newUser)
    await newUser.save()

    revalidatePath('/')
    return { status: 200 }
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (formData: FormData) => {
  const id = formData.get('_id')

  try {
    await connectToDb()
    await User.findOneAndDelete({ _id: id })

    revalidatePath('/')
    console.log({ message: `Deleted user ${id}` })
    return { message: `Deleted user ${id}` }
  } catch (err) {
    return { message: 'Failed to delete user' + err }
  }
}

export const updateUser = async (formData: FormData) => {
  const _id = formData.get('id')
  const username = formData.get('username')
  const email = formData.get('email')
  const img = formData.get('image')
  const isAdmin = formData.get('isAdmin')

  try {
    await connectToDb()
    await User.findOneAndUpdate(
      { _id: _id },
      {
        username: username,
        email: email,
        img: img,
        isAdmin: isAdmin === 'true' ? Boolean(true) : Boolean(false),
      }
    )
    console.log(`Updated user ${_id}`)

    revalidatePath('/dashboard')
    return { message: `Updated user ${_id}` }
  } catch (err) {
    return { message: 'Failed to update to db' + err }
  } finally {
    await signOut()
    redirect('/')
  }
}

export const resetPassword = async (formData: FormData) => {
  const id = formData.get('id')
  const passwordValue = formData.get('password')

  if (typeof passwordValue !== 'string' || !passwordValue) {
    return { message: 'Hasło jest wymagane i musi być ciągiem znaków.' }
  }
  if (typeof id !== 'string' || !id) {
    return { message: 'Wymagane jest podanie identyfikatora użytkownika.' }
  }

  const hashedPassword = await bcrypt.hash(passwordValue, 5)

  try {
    await connectToDb()
    await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      }
    )
    console.log(`Updated user ${id}`)
    revalidatePath('/dashboard')
    return { message: `Updated user ${id}` }
  } catch {
    return { message: 'Failed to update to db' }
  } finally {
    await signOut()
    redirect('/')
  }
}

export const addNotebook = async (formData:FormData) => {
  const name = formData.get('name') as string
  const userId = formData.get('userId') as string
  const column = formData.get('column') as string
  if (!name) {
    return { error: 'Name is required' }
  }
  try {
    connectToDb()
    const newNotebook = new Notebook({
      name,
      userId,
      column,
    })
    console.log(newNotebook)
    await newNotebook.save()

    revalidatePath('/dashboard')
    return { status: 200 }
    
  } catch (err) {
    console.log(err)
  }
}

export const getNotebooks = async (userId: string)=>{
  try{
    await connectToDb()
    const notebooks = await Notebook.find({userId})
    // Konwertuj dokumenty MongoDB na zwykłe obiekty JavaScript
    return JSON.parse(JSON.stringify(notebooks))
  }catch (err) {
    console.log(err)
    return []
  }
}

export const getNotebookById = async (id: string) => {
  try {
    await connectToDb()
    const notebook = await Notebook.findById(id)
    // Konwertuj dokument MongoDB na zwykły obiekt JavaScript
    return JSON.parse(JSON.stringify(notebook))
  } catch (err) {
    console.log(err)
    return null
  }
}

export const deleteNotebook = async (formData: FormData) => {
  const id = formData.get('id') as string
  try {
    await connectToDb()
    await Notebook.findByIdAndDelete(id)
    revalidatePath('/dashboard')
    console.log(`Deleted notebook ${id}`)
    return { status: 200 }
  } catch (err) {
    console.log(err)
  }
}

export const updateNotebook = async (formData: FormData) => {
  const _id = formData.get('id') as string
  const name = formData.get('name') as string
  const column = formData.get('column') as string
  if (!name) {
    return { error: 'Name is required' }
  }
  
  try {
    await connectToDb()
    await Notebook.findByIdAndUpdate(_id, {
      name,
      column
    })
    
    revalidatePath('/dashboard')
    return { status: 200 }
  } catch (err) {
    console.log(err)
    return { error: 'Failed to update notebook' }
  }
}
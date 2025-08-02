'use server'

import connectToDb from './connectToDb'
import { User, UserWithoutId } from './models'
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

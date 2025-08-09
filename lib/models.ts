import mongoose from 'mongoose'

export type User = {
  _id: string
  username: string
  email: string
  password: string
  img: string
  isAdmin: boolean
}

export type Notebook = {
  _id: string
  name: string
  userId: string
  column?: string
}

export type UserWithoutId = Omit<User, '_id'>

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, min: 3, max: 50 },
    password: { type: String, required: true, min: 6, max: 50 },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const notebookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 20 },
    userId: { type: String, required: true },
    column: { type: String, default: '1' }, // Domyślnie 'Planned'
  },
  { timestamps: true }
)

export const User = mongoose.models?.User || mongoose.model('User', userSchema)

export const Notebook =
  mongoose.models?.Notebook || mongoose.model('Notebook', notebookSchema)

import NextAuth from "next-auth"
 import GitHub from "next-auth/providers/github"
 import Google from "next-auth/providers/google"
 import Credentials from "next-auth/providers/credentials"
import { User } from '@/lib/models'
import connectToDb from '@/lib/connectToDb'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

 Credentials({
      
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
       
 
       await connectToDb()
        const user = await User.findOne({ 
            email: (credentials.email as string).toLowerCase().trim()
          })
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string,
            user.password as string
          )
           if (!isPasswordCorrect) {
            console.error(`Login attempt failed: Invalid password for email: ${credentials.email}`)
            throw new Error('Invalid credentials')
          }
        // return user object with their profile data
          return user
      },
    })
  ],
})

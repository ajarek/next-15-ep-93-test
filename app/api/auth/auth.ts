/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
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
        try {
          await connectToDb()
          const user = await User.findOne({
            email: (credentials.email as string).toLowerCase().trim(),
          })

          if (!user) {
            console.error(
              `Login attempt failed: User not found for email: ${credentials.email}`
            )
            throw new Error('Invalid credentials.')
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password as string
          )
          if (!isPasswordCorrect) {
            console.error(
              `Login attempt failed: Invalid password for email: ${credentials.email}`
            )
            throw new Error('Invalid credentials')
          }

          return {
            id: user._id,
            name: user.username,
            email: user.email,
            image: user.img,
            isAdmin: user.isAdmin,
          }
        } catch (err: any) {
          console.error('Authentication error:', {
            message: err.message,
            email: credentials.email,
            timestamp: new Date().toISOString(),
          })

          if (
            err.message.includes('credentials') ||
            err.message.includes('attempts')
          ) {
            throw err
          }

          throw new Error('Authentication failed. Please try again.')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.isAdmin,
          image: user.image,
        }
      }
      return token
    },

    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          image: token.image as string,
        },
      }
    },
  },
})

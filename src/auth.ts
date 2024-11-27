import NextAuth, {
  CredentialsSignin,
  User,
  type DefaultSession,
} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import db from './lib/db'
import authConfig from './auth.config'
import { ObjectId } from 'mongodb'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid username'
}

declare module 'next-auth' {
  export interface User {
    username: string
    date: Date
    _id: ObjectId
    bio?: string
  }
  export interface Session {
    user: {
      name: string
      username: string
      _id: ObjectId
      date: Date
      bio?: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(db.clientPromise) as any,
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      authorize: async (credentials) => {
        try {
          const user = await db.getUser(credentials.username as string)
          if (user) {
            return {
              ...user,
              _id: new ObjectId(user._id),
              bio: user.bio || '',
            } as User
          } else {
            throw new InvalidLoginError()
          }
        } catch (error) {
          if (error instanceof InvalidLoginError) {
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username as string,
          _id: token._id as ObjectId,
          date: token.date as Date,
          bio: token.bio as string,
        },
      }
    },
    jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token._id = user._id
        token.date = user.date
        token.bio = user.bio
      }
      return token
    },
    authorized({ auth }) {
      return !!auth?.user
    }
  },
})

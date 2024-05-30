import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import db from './lib/db'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(db.clientPromise),
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      authorize: async (credentials) => {
        const user = await db.getUser(credentials.username as string)
        if (user) {
          return user as User
        } else {
          return null
        }
      },
    }),
  ],
})

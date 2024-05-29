import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/db'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      authorize: async (credentials) => {
        const user = await getUserFromDb(credentials.username as string)
        if (user) {
          return user as User
        } else {
          return null
        }
      },
    }),
  ],
})

// get user from db
async function getUserFromDb(username: string) {
  const client = await clientPromise
  const db = client.db('sample_analytics')
  const users = db.collection('customers')
  const user = await users.findOne({ username })
  console.log(user)
  return user
}

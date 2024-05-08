import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
    authorize: async (credentials, request) => {
        let user = null

        // logic to verify if user exists
        user = await getUserFromDb(credentials.username as string)

        if (!user) {
            
            throw new Error('User not found.')
        }

        // return user object with their profile data
        return user as User
    },
    }),
  ],
})

// get user from db
async function getUserFromDb(username: string) {
    const client = await clientPromise
    const db = client.db()
    const users = db.collection('users')
    const user = await users.findOne({ username })
    return user
}

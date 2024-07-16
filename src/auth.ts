import NextAuth, { User, CredentialsSignin, AuthError } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import db from './lib/db'
import authConfig from './auth.config'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid username'
}

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
        // db.checkDB()
        // const user = await db.getUser(credentials.username as string).then((user) => {
        //   return user as User
        // }).catch((error) => {
        //   console.log('credentials error, no user found')
        //   return null
        // })
        // return user

        // try {
        //   if (user) {
        //     console.log('this happened')
        //     return user as User
        //   }
        // } catch (CredentialsSignin) {
        //   console.log('credentials error, no user found')
        //   return null
        // }
        // console.log('lalalalala')
        // return null

        try {
          const user = await db.getUser(credentials.username as string)
          if (user) {
            return user as User
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
})

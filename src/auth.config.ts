import { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import clientPromise from './lib/db'

export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      authorize: undefined
    }),
  ],
} satisfies NextAuthConfig



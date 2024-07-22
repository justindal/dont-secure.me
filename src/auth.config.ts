import { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
      },
      authorize: undefined,
    }),
  ],
} satisfies NextAuthConfig

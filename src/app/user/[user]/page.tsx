'use server'

import checkUser from '@/actions/checkUser'
import  { auth } from '@/auth'

import { UnauthorizedAlert } from '@/components/unauthorized'


const Page = async ({ params }: { params: { user: string } }) => {
  const session = await auth()
  if (!session) return UnauthorizedAlert()
  const user = await checkUser(params.user)
  console.log(user)
  return <div>{params.user}</div>
}

export default Page

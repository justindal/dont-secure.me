import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getSuggestedUsers } from '@/actions/user/getSuggestedUsers'
import Link from 'next/link'

const HomeSuggestedCard = async () => {
  async function getUsers() {
    const suggestedUsers = (await getSuggestedUsers()) as []
    if (suggestedUsers.length === 0) {
      return []
    }
    return suggestedUsers
  }

  return (
    <Card className='m-4'>
      <CardHeader>
        <CardTitle>Suggested Users</CardTitle>
        <CardDescription>users you might like!</CardDescription>
      </CardHeader>
      <CardContent>
        {getUsers().then((users) => {
          return (
            <div>
              {users.map((user: any) => {
                return (
                  <div key={user._id}>
                    <Link href={`/user/${user.username}`}>{user.username}</Link>
                  </div>
                )
              })}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default HomeSuggestedCard

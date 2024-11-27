import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getSuggestedUsers } from '@/actions/user/getSuggestedUsers'
import { getProfilePicture } from '@/actions/profilepicture/getProfilePicture'

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
        {getUsers().then(async (users) => {
          return Promise.all(
            users.map(async (user: any) => {
              const avatarUrl = await getProfilePicture(user.username).catch(
                () => undefined,
              )

              return (
                <div
                  key={user.id}
                  className='flex items-center justify-between p-4'
                >
                  <div className='pt-2 pl-2 pb-1'>
                    {user.username && (
                      <div>
                        <Link
                          className='font-semibold'
                          href={`/user/${user.username}`}
                        >
                          @{user.username}
                        </Link>
                        {user.title && ': ' + user.title}
                      </div>
                    )}
                  </div>
                  <Avatar className='h-12 w-12 ml-4'>
                    <AvatarImage
                      src={avatarUrl || undefined}
                      alt='Profile Picture'
                    />
                    <AvatarFallback>
                      {user.username.slice(0, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )
            }),
          )
        })}
      </CardContent>
    </Card>
  )
}

export default HomeSuggestedCard

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const HomeSuggestedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Users</CardTitle>
        <CardDescription>users you might like!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default HomeSuggestedCard

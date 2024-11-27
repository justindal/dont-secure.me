import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { login } from '@/actions/login/login'

interface UserExistsAlertProps {
  isOpen: boolean
  onOpenChange: (newOpenState: boolean) => void
  username: string
}

const UserExistsAlert = ({
  isOpen,
  onOpenChange,
  username,
}: UserExistsAlertProps) => {
  const handleCancel = () => {
    // handle cancel
    console.log('cancel')
  }

  const handleLogin = async () => {
    // handle login
    console.log('login')
    await login({ username })
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>User exists.</AlertDialogTitle>
          <AlertDialogDescription>
            A user with the username <strong>@{username}</strong> already
            exists. Do you want to login instead?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Back</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UserExistsAlert

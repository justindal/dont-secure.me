'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import checkUser from '@/actions/checkUser'
import createUser from '@/actions/createUser'
import { login } from '@/actions/login'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema, RegisterSchema } from '@/schemas'

import { AlertCircle } from 'lucide-react'

interface RegisterDialogProps {
  trigger?: React.ReactNode
  isOpenInitial?: boolean
}

const RegisterDialog = ({
  trigger,
  isOpenInitial = true,
}: RegisterDialogProps) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      name: '',
    },
  })

  // initial state for dialog, open when trigger does not exist
  const [isOpen, setIsOpen] = useState(!trigger ? isOpenInitial : false)

  // handling form values
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [hasLoginError, setLoginError] = useState(false)

  // transition state
  const [isPending, startTransition] = useTransition()

  // reset dialog state upon trigger change
  useEffect(() => {
    if (!trigger) {
      setIsOpen(isOpenInitial)
    }
  }, [isOpenInitial, trigger])

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      await checkUser(data.username).then((response) => {
        if (response) {
          // user exists, prompt login
          console.log('user exists')
        } else {
          // user does not exist, create new user
          console.log('user does not exist')
          createUser(data.username, data.name).then(() => {
            login({ username: data.username }).then((response) => {
              if (response == undefined || response.success) {
                console.log('logged in')
                setLoginError(false)
              } else {
                console.log('login failed')
                console.log(response)
                setLoginError(true)
              }
            })
          })
        }
      })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Create a new profile to get started!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='johndoe' {...field} />
                  </FormControl>
                  <FormDescription>choose your username!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormDescription>enter your name!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterDialog

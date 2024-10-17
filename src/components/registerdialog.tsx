'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import UserExistsAlert from '@/components/userexists'
import ProfilePictureInput from './profilepictureinput'

import checkUser from '@/actions/user/checkUser'
import createUser from '@/actions/user/createUser'
import { uploadImage } from '@/actions/image/uploadImage'
import { login } from '@/actions/login/login'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema } from '@/schemas'

interface RegisterDialogProps {
  trigger?: React.ReactNode
  isOpenInitial?: boolean
}

const RegisterDialog = ({
  trigger,
  isOpenInitial = true,
}: RegisterDialogProps) => {
  const { toast } = useToast()
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
  const [hasLoginError, setLoginError] = useState(false)

  // user exists alert
  const [alertOpen, setAlertOpen] = useState(false)

  // alert dialog update
  const handleOpenChange = (newOpenState: boolean) => {
    setAlertOpen(newOpenState)
  }

  // handle username change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  // transition state
  const [isPending, startTransition] = useTransition()

  // reset dialog state upon trigger change
  useEffect(() => {
    if (!trigger) {
      setIsOpen(isOpenInitial)
    }
  }, [isOpenInitial, trigger])

  // profile picture setting
  const [profilePicture, setProfilePicture] = useState<{
    file: File | null
    url: string | null
  }>({ file: null, url: null })

  const handleProfilePictureChange = (file: File | null) => {
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setProfilePicture({ file, url: imageURL })
    } else {
      setProfilePicture({ file: null, url: null })
    }
  }

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      await checkUser(data.username).then((response) => {
        setUsername(data.username)
        if (response) {
          // user exists, prompt login
          console.log('user exists')
          setAlertOpen(true)
        } else {
          // user does not exist, create new user
          console.log('user does not exist')
          createUser(data.username, data.name).then(() => {
            // upload profile picture
            if (profilePicture && profilePicture.file) {
              console.log('uploading image')
              const formData = new FormData()
              formData.append('file', profilePicture.file)
              uploadImage(formData, data.username, 'pfp').then(() => {
                console.log('uploaded')
              })
              toast({
                title: 'Account created!',
                description: 'Logging in now...',
              })
            }

            // TODO additional user info prompt
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
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
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
              <div className='flex items-center space-x-4'>
                <ProfilePictureInput
                  username={username}
                  onFileChange={handleProfilePictureChange}
                />
                <Avatar className='w-14 h-14'>
                  <AvatarImage src={profilePicture.url ?? undefined} />
                  <AvatarFallback>:)</AvatarFallback>
                </Avatar>
              </div>

              <Button type='submit' className='w-full' disabled={isPending}>
                Continue
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <UserExistsAlert
        isOpen={alertOpen}
        onOpenChange={handleOpenChange}
        username={username}
      />
    </div>
  )
}

export default RegisterDialog

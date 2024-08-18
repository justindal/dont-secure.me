'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTransition } from 'react'

import { AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

import { login } from '@/actions/login/login'
import { LoginSchema } from '@/schemas'

import RegisterDialog from './registerdialog'

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [hasLoginError, setLoginError] = useState(false)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      login(data).then((response) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              {hasLoginError && (
                <Alert className='m-3'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>No user found</AlertTitle>
                  <AlertDescription>
                    The user does not exist. Please create an account{' '}
                    <RegisterDialog
                      trigger={
                        <a className='underline cursor-pointer font-extrabold text-xl text-cyan-600'>
                          here
                        </a>
                      }
                    ></RegisterDialog>
                  </AlertDescription>
                </Alert>
              )}
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>choose your username!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm

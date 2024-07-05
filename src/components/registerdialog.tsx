'use client'

import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import checkUser from '@/actions/checkUser'
import createUser from '@/actions/createUser'
import { login } from '@/actions/login'

interface RegisterDialogProps {
  trigger?: React.ReactNode
  isOpenInitial?: boolean
}

const RegisterDialog = ({
  trigger,
  isOpenInitial = true,
}: RegisterDialogProps) => {
  // initial state for dialog, open when trigger does not exist
  const [isOpen, setIsOpen] = useState(!trigger ? isOpenInitial : false)

  // handling form values
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  // reset dialog state upon trigger change
  useEffect(() => {
    if (!trigger) {
      setIsOpen(isOpenInitial)
    }
  }, [isOpenInitial, trigger])

  // handle changes for the input fields for form submission
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    if (id === 'username') {
      setUsername(value)
    } else if (id === 'name') {
      setName(value)
    }
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('username:', username)
    console.log('name:', name)
    ;(async () => {
      const user = await checkUser(username)
      if (user) {
        console.log('User already exists')
      } else {
        console.log('User does not exist, creating profile...')
        await createUser(username, name)
        await login({ username })
      }
    })()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <form onSubmit={onSubmit}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                id='username'
                value={username}
                onChange={handleChange}
                placeholder='johndoe'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                value={name}
                onChange={handleChange}
                placeholder='John Doe'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={onSubmit}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default RegisterDialog

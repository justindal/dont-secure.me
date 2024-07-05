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

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface RegisterDialogProps {
  trigger?: React.ReactNode
  isOpenInitial?: boolean
}

const RegisterDialog = ({
  trigger,
  isOpenInitial = true,
}: RegisterDialogProps) => {
  const [isOpen, setIsOpen] = useState(!trigger ? isOpenInitial : false)

  useEffect(() => {
    if (!trigger) {
      setIsOpen(isOpenInitial)
    }
  }, [isOpenInitial, trigger])

  const onSubmit = () => {

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
              defaultValue='johndoe'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue='John Doe'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterDialog

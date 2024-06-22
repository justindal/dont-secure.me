'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { SquarePlus } from 'lucide-react'
import { title } from 'process'

const NewPost = () => {
  const form = useForm({
    defaultValues: {
      description: '',
      title: '',
    },
  })

  function onSubmit() {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>submitted post!</code>
        </pre>
      ),
    })
    console.log('submitted post!')
  }

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex items-center space-x-5 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            <SquarePlus />
            New Post
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Create a post to share to the world!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='text goes here...'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogTrigger asChild>
                <Button type='submit'>Post!</Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewPost

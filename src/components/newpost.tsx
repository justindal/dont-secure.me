'use client'

import { useForm } from 'react-hook-form'

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { SquarePlus } from 'lucide-react'

import createPost from '@/actions/posts/createPost'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

const NewPost = ({ session }: Props) => {
  const form = useForm({
    defaultValues: {
      description: '',
      title: '',
    },
  })
  const { toast } = useToast()

  async function onSubmit() {
    toast({
      title: 'Post Submitted',
      description: 'Your post has been submitted: ' + form.getValues('description'),
    })
    // call api to submit post
    console.log('submitted post: ', form.getValues())
    createPost({
      title: form.getValues('title'),
      description: form.getValues('description'),
      user: session.user,
    })

    form.reset()
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
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='title (optional)'
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

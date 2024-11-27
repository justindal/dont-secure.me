'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { addComment, getComments } from '@/actions/posts/comment'
import { MessageCircle, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface CommentsProps {
  postId: string
  session: any
}

export function Comments({ postId, session }: CommentsProps) {
  const [comments, setComments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      content: '',
    },
  })

  async function loadComments() {
    setIsLoading(true)
    const result = await getComments(postId)
    if (result?.comments) {
      setComments(result.comments)
    }
    setIsLoading(false)
  }

  async function onSubmit(data: { content: string }) {
    await addComment(postId, data.content)
    form.reset()
    loadComments()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (open) loadComments()
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="default">
          <MessageCircle className="mr-2 h-5 w-5" />
          Comments
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        {session && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a comment..." 
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Post Comment</Button>
            </form>
          </Form>
        )}

        <div className="space-y-4 mt-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id.toString()} className="flex space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {comment.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">@{comment.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
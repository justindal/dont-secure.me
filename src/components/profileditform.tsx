'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/actions/image/uploadImage'
import { updateProfile } from '@/actions/user/updateProfile'

interface ProfileEditFormProps {
  initialName: string
  initialBio: string
  username: string
}

export function ProfileEditForm({ initialName, initialBio, username }: ProfileEditFormProps) {
  const [name, setName] = useState(initialName)
  const [bio, setBio] = useState(initialBio)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      await uploadImage(formData, username, 'profile', file.type.split('/')[1])
    } catch (error: any) {
      console.error('Error uploading image:', error)
      // Show error message to user
      // You can use the toast system here
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateProfile({ name, bio })
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
      </div>
      
      <div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-4"
        />
      </div>

      <div>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="mb-4"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}
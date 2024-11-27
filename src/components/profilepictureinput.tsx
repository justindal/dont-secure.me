import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { uploadImage } from '@/actions/image/uploadImage'

interface Props {
  username: string
  onFileChange: (file: File | null) => void
}

const ProfilePictureInput = ({ onFileChange }: Props) => {
  const [file, setFile] = useState<File | null>(null)

//   useEffect(() => {
//     console.log(file)
//   }, [file])

  //   const handleSubmit = async () => {
  //     console.log('submit')
  //     if (file) {
  //       const formData = new FormData()
  //       formData.append('file', file)
  //       try {
  //         await uploadImage(formData, username)
  //       } catch {
  //         console.log('error')
  //       }
  //     }
  //   }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
      onFileChange(event.target.files[0])
    }
  }
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>Profile Picture</Label>
      <div className='flex gap-2'>
        <Input
          id='picture'
          type='file'
          onChange={handleFileChange}
          accept='image/*'
        />
        {/* <Button
          disabled={!file}
          onClick={(e) => {
            console.log('upload:' + file?.name)
            e.preventDefault()
            handleSubmit()
          }}
        >
          Upload
        </Button> */}
      </div>
    </div>
  )
}

export default ProfilePictureInput

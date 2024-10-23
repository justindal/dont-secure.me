import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { uploadImage } from '@/actions/image/uploadImage'

export const POST = auth(async function POST(req) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { error: 'Request body is missing' },
        { status: 400 },
      )
    }

    const { file, username, filetype } = await req.json()

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 },
      )
    }

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      )
    }

    if (!filetype) {
      return NextResponse.json(
        { error: 'File type is required' },
        { status: 400 },
      )
    }

    // Decode the base64 string to get the binary data
    const buffer = Buffer.from(file, 'base64')
    const formData = new FormData()
    formData.append('file', new Blob([buffer]), `${username}.${filetype}`)

    // Upload the image
    await uploadImage(formData, username, filetype)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
})
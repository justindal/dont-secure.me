'use server'

import * as objectstorage from 'oci-objectstorage'
import * as common from 'oci-common'
import db from '@/lib/db'

export const getProfilePicture = async (username: string) => {
  const provider: common.ConfigFileAuthenticationDetailsProvider =
    new common.ConfigFileAuthenticationDetailsProvider()

  const getProfilePictureBlob = async () => {
    try {
      const client = new objectstorage.ObjectStorageClient({
        authenticationDetailsProvider: provider,
      })

      const getObjectRequest = {
        namespaceName: process.env.NAMESPACE as string,
        bucketName: process.env.BUCKET_NAME as string,
        objectName: await db.getProfilePicture(username),
      }

      // Send request to the Client
      const res = await client.getObject(getObjectRequest)

      // Convert the response to a buffer
      const chunks: Uint8Array[] = []
      if (res.value instanceof ReadableStream) {
        const reader = res.value.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          chunks.push(value)
        }
      } else {
        for await (const chunk of res.value) {
          chunks.push(chunk)
        }
      }
      const buffer = Buffer.concat(chunks)
      const base64 = Buffer.from(buffer).toString('base64')
      return `data:image/jpeg;base64,${base64}`
    } catch (error) {
      console.log('get Failed with error  ' + error)
      return null
    }
  }

  return getProfilePictureBlob()
}

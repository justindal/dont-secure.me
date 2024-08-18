'use server'

import * as objectstorage from 'oci-objectstorage'
import * as common from 'oci-common'
import db from '@/lib/db'

export const uploadImage = async (
  formData: FormData,
  username: string,
  imgType: string,
) => {
  const provider: common.ConfigFileAuthenticationDetailsProvider =
    new common.ConfigFileAuthenticationDetailsProvider()

  ;(async () => {
    try {
      // Create a service client
      const client = new objectstorage.ObjectStorageClient({
        authenticationDetailsProvider: provider,
      })

      const file = formData.get('file') as File

      const buffer = await file.arrayBuffer()
      const fileContent = new Uint8Array(buffer)

      const putObjectRequest = {
        namespaceName: process.env.NAMESPACE as string,
        bucketName: process.env.BUCKET_NAME as string,
        objectName: `${imgType}s/${imgType}_${username}.${file.type.split('/')[1]}`,
        putObjectBody: fileContent,
        contentType: file.type,
        contentLength: file.size,
      }

      
      // Send request to the Client.
      const res = await client.putObject(putObjectRequest)
      // send objectName to mongodb users collection
      await db.updateProfilePicture(username, putObjectRequest.objectName)
      console.log(putObjectRequest)
    } catch (error) {
      console.log('put Failed with error  ' + error)
    }
  })()
}

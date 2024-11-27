import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import LoginForm from './loginForm'

export function UnauthorizedAlert() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='m-2 text-3xl font-bold dark:text-white'>
        Unauthorized Access!
      </h1>
      <Alert variant='destructive' className='m-2 w-full max-w-sm'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Please log in.</AlertDescription>
      </Alert>

      <LoginForm />
    </div>
  )
}

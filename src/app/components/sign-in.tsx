import { signIn } from '@root/auth'

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        'use server'
        await signIn('credentials', formData)
      }}
    >
      <label>
        username:
        <input name='username' type='username' />
      </label>
      <button>Sign In</button>
    </form>
  )
}

export default SignIn

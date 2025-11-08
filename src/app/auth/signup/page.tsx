'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignupData = z.infer<typeof signupSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupData) => {
    setLoading(true)
    setErrorMsg(null)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // redirect after magic link / confirm (optional)
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      }
    })
    setLoading(false)
    if (error) {
      setErrorMsg(error.message)
      return
    }
    // show info, redirect to check email page or dashboard
    router.push('/auth/check-email') // create a page that says "check your email"
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">S'inscrire</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input {...register('email')} className="input" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block">Mot de passe</label>
          <input {...register('password')} type="password" className="input" />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button disabled={loading} className="btn">
          {loading ? 'En cours...' : "S'inscrire"}
        </button>
      </form>
    </div>
  )
}

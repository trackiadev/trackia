'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';

const schema = z.object({ email: z.string().email() });
type Form = z.infer<typeof schema>;

export default function ResetPage() {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`,
    });
    if (error) setMessage(`Erreur: ${error.message}`);
    else
      setMessage(
        'Si un compte existe, tu recevras un email pour réinitialiser le mot de passe.',
      );
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="ton.email@exemple.com"
          className="input"
        />
        <button className="btn">Envoyer le lien</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

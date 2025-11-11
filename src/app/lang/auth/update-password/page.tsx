'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';

const schema = z.object({ password: z.string().min(6) });
type Form = z.infer<typeof schema>;

export default function UpdatePasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  // Supabase gère souvent la mise à jour via token en interne si on redirige vers app
  // Ici on propose un flow : updateUser si session exist
  const onSubmit = async (data: Form) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) setMessage(`Erreur: ${error.message}`);
    else {
      setMessage('Mot de passe mis à jour. Redirection en cours...');
      setTimeout(() => router.push('/auth/login'), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Choisis un nouveau mot de passe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="password"
          {...register('password')}
          placeholder="Nouveau mot de passe"
          className="input"
        />
        <button className="btn">Mettre à jour</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

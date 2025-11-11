'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

// 1️⃣ Schéma de validation Zod
const signupSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Mot de passe trop court (min 6 caractères)' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// 2️⃣ TypeScript type à partir du schéma
type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // 3️⃣ Hook useForm
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  // 4️⃣ Etat pour les messages globaux
  const [message, setMessage] = useState('');

  // 5️⃣ Fonction onSubmit pour créer l'utilisateur
  const onSubmit = async (data: SignupFormInputs) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Compte créé ! Vérifiez votre email pour confirmer.');
    }
  };

  // 6️⃣ JSX du formulaire
  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <input {...register('password')} type="password" placeholder="Mot de passe" />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div>
          <input {...register('confirmPassword')} type="password" placeholder="Confirmer mot de passe" />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">S’inscrire</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

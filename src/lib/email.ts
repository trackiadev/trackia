import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTestEmail(to: string) {
  return resend.emails.send({
    from: 'onboarding@resend.dev', // expéditeur test
    to, // email destinataire
    subject: '🚀 Test Resend',
    html: '<p>Email de test depuis lib/email.ts !</p>',
  });
}

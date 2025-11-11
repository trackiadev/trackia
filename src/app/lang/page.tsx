'use client';

import '../styles/globals.css';

export default function Home() {
  const sendEmail = async () => {
    try {
      const res = await fetch('/api/sendTestEmail', { method: 'POST' });
      const data = await res.json();
      alert(data.success ? 'Email envoyé !' : 'Erreur : ' + data.error);
    } catch (err: any) {
      alert('Erreur lors de l’envoi : ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div className="bg-red-500 mr-2 text-white p-4">
        Tailwind fonctionne !
      </div>
      <h1>Test Resend Email</h1>
      <button
        onClick={sendEmail}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#111',
          color: '#fff',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Envoyer email test
      </button>
    </div>
  );
}

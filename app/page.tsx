'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MessageForm from '@/components/MessageForm';
import Header from '@/components/Header';
import SuccessAnimation from '@/components/SuccessAnimation';

export default function Home() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setLastMessageId(data.messageId);
      setShowSuccess(true);
    } else {
      const error = await response.json();
      alert(error.error || 'Une erreur est survenue');
    }
  };

  const handleSendNow = async () => {
    if (!lastMessageId) return;

    setSending(true);
    try {
      const response = await fetch('/api/send-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: lastMessageId }),
      });

      if (response.ok) {
        alert('Message envoyé avec succès ! Vérifiez votre boîte email.');
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-[#f2c94c]">
          <div className="w-16 h-16 bg-[#f2c94c] rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Message enregistré !</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vous recevrez un email de confirmation. Votre message sera envoyé à la date prévue.
          </p>
          <div className="space-y-3">
            {/* <button
              onClick={handleSendNow}
              disabled={sending}
              className="bg-[#f2c94c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e5b935] transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Envoi en cours...' : '🚀 Envoyer maintenant (test)'}
            </button> */}
            <button
              onClick={() => {
                setShowSuccess(false);
                setLastMessageId(null);
                router.push('/');
              }}
              className="bg-[#56ccf2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#45b8e0] transition-colors w-full"
            >
              Créer un autre message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <SuccessAnimation show={showConfetti} onComplete={() => setShowConfetti(false)} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black dark:text-white" style={{ fontFamily: 'Tangerine, cursive' }}>
            Un jour, vous relirez ces mots.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed">
            Et vous vous souviendrez de qui vous étiez, et de tout ce que vous vouliez devenir.<br />
            {/* Écrivez maintenant. Le futur vous attend. */}
            Ecrivez un message à votre futur vous, pour ne pas oublier ce qui compte aujourd&apos;hui.
          </p>
        </div>

        <MessageForm
          onSubmit={handleSubmit}
          onSuccess={() => setShowConfetti(true)}
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-[#f2c94c] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Écrivez votre message</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Commencez par &quot;Cher prochain moi,&quot; et écrivez ce que vous voulez vous dire
              </p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-[#56ccf2] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Choisissez la date</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sélectionnez quand vous voulez recevoir ce message
              </p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-[#f2c94c] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Recevez votre message</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                À la date prévue, vous recevrez votre message par email
              </p>
            </div>
          </div>
        </div>
      </main>

      <Header variant="footer" />
    </div>
  );
}

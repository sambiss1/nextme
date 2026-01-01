'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MessageForm from '@/components/MessageForm';

export default function Home() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

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
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-6 rounded-xl border-2 border-[#f2c94c]">
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
          <h2 className="text-2xl font-bold text-gray-800">Message enregistré !</h2>
          <p className="text-gray-600">
            Vous recevrez un email de confirmation. Votre message sera envoyé à la date prévue.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleSendNow}
              disabled={sending}
              className="bg-[#f2c94c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e5b935] transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Envoi en cours...' : '🚀 Envoyer maintenant (test)'}
            </button>
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
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Image
            src="/logo.png"
            alt="ProchainMoi"
            width={180}
            height={45}
            priority
            className="h-10 w-auto"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Écrivez à votre futur vous
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Créez un message que vous recevrez à la date de votre choix.
            <br />
            <span className="text-[#56ccf2] font-medium">Facile, simple et sécurisé.</span>
          </p>
        </div>

        <MessageForm onSubmit={handleSubmit} />

        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-6 rounded-xl border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#f2c94c] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Écrivez votre message</h3>
              <p className="text-gray-600 text-sm">
                Commencez par &quot;Cher prochain moi,&quot; et écrivez ce que vous voulez vous dire
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#56ccf2] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Choisissez la date</h3>
              <p className="text-gray-600 text-sm">
                Sélectionnez quand vous voulez recevoir ce message
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl border-2 border-gray-100">
              <div className="w-12 h-12 bg-[#f2c94c] text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Recevez votre message</h3>
              <p className="text-gray-600 text-sm">
                À la date prévue, vous recevrez votre message par email
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <Image
            src="/logo.png"
            alt="ProchainMoi"
            width={140}
            height={35}
            className="h-7 w-auto mx-auto mb-3"
          />
          <p className="text-gray-600 text-sm">Envoyez un message à votre futur vous</p>
        </div>
      </footer>
    </div>
  );
}

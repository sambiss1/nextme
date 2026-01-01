'use client';

import { useState } from 'react';

export default function TestEmail() {
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'confirmation' | 'future'>('confirmation');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          email,
          message: type === 'future' ? message : undefined,
          accessToken: 'test-token-' + Date.now(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({
          success: false,
          message: data.details || data.error || 'Erreur inconnue'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Erreur de connexion'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Test d&apos;envoi d&apos;email</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Testez l&apos;envoi d&apos;emails de confirmation et de messages futurs
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Votre email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#f2c94c] focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Type d&apos;email
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  name="type"
                  value="confirmation"
                  checked={type === 'confirmation'}
                  onChange={(e) => setType(e.target.value as 'confirmation')}
                  className="w-4 h-4"
                />
                <span>Email de confirmation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  name="type"
                  value="future"
                  checked={type === 'future'}
                  onChange={(e) => setType(e.target.value as 'future')}
                  className="w-4 h-4"
                />
                <span>Message futur</span>
              </label>
            </div>
          </div>

          {type === 'future' && (
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Message personnalisé (optionnel)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#f2c94c] focus:border-transparent resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Laissez vide pour utiliser le message de test par défaut"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f2c94c] text-gray-900 py-4 rounded-lg font-medium hover:bg-[#e0b73c] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer l\'email de test'}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded-lg ${result.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
              }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${result.success ? 'bg-green-500' : 'bg-red-500'
                  }`}
              >
                {result.success ? (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3
                  className={`font-semibold ${result.success ? 'text-green-900' : 'text-red-900'
                    }`}
                >
                  {result.success ? 'Succès !' : 'Erreur'}
                </h3>
                <p
                  className={`text-sm mt-1 ${result.success ? 'text-green-700' : 'text-red-700'
                    }`}
                >
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Configuration requise</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Assurez-vous d&apos;avoir configuré les variables d&apos;environnement suivantes dans votre fichier <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">.env.local</code> :
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• SMTP_HOST</li>
            <li>• SMTP_PORT</li>
            <li>• SMTP_USER</li>
            <li>• SMTP_PASS</li>
            <li>• SMTP_FROM</li>
            <li>• NEXT_PUBLIC_BASE_URL</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

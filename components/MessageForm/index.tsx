'use client';

import { useState } from 'react';

interface MessageFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

type DateOption = '3months' | '6months' | '1year' | 'custom';

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Cher prochain moi,\n\n');
  const [dateOption, setDateOption] = useState<DateOption>('3months');
  const [customDate, setCustomDate] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDate = (option: DateOption): string => {
    const today = new Date();
    switch (option) {
      case '3months':
        today.setMonth(today.getMonth() + 3);
        break;
      case '6months':
        today.setMonth(today.getMonth() + 6);
        break;
      case '1year':
        today.setFullYear(today.getFullYear() + 1);
        break;
      case 'custom':
        return customDate;
    }
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('message', message);
    formData.append('sendDate', calculateDate(dateOption));
    formData.append('visibility', visibility);

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  // today date
  const today = new Date();
  const todayDateString = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 md:p-6 space-y-5">

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
            Une lettre du {todayDateString}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56ccf2] focus:border-[#56ccf2] transition-all resize-none text-base leading-relaxed"
            placeholder="Cher prochain moi,..."
          />

        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            À envoyer dans/au
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              type="button"
              onClick={() => setDateOption('3months')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${dateOption === '3months'
                ? 'bg-[#f2c94c] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Dans 3 mois
            </button>
            <button
              type="button"
              onClick={() => setDateOption('6months')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${dateOption === '6months'
                ? 'bg-[#f2c94c] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Dans 6 mois
            </button>
            <button
              type="button"
              onClick={() => setDateOption('1year')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${dateOption === '1year'
                ? 'bg-[#f2c94c] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Dans 1 an
            </button>
            <button
              type="button"
              onClick={() => setDateOption('custom')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${dateOption === 'custom'
                ? 'bg-[#56ccf2] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Choisir une date
            </button>
          </div>
          {dateOption === 'custom' && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              required
              min={minDateString}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56ccf2] focus:border-[#56ccf2] transition-all text-base"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Visibilité
          </label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-300 hover:border-[#56ccf2] transition-all flex-1">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value as 'private')}
                className="w-4 h-4 text-[#56ccf2] focus:ring-[#56ccf2]"
              />
              <span className="text-sm font-medium">Privé</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-300 hover:border-[#f2c94c] transition-all flex-1">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) => setVisibility(e.target.value as 'public')}
                className="w-4 h-4 text-[#f2c94c] focus:ring-[#f2c94c]"
              />
              <span className="text-sm font-medium">Public</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
            Assurez-vous de recevoir votre lettre, saisissez votre adresse email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56ccf2] focus:border-[#56ccf2] transition-all text-base"
            placeholder="votre@email.com"
          />
        </div>


        {/* <div>
          <label htmlFor="files" className="block text-sm font-medium mb-2 text-gray-700">
            Pièces jointes (optionnel)
          </label>
          <input
            type="file"
            id="files"
            onChange={(e) => setFiles(e.target.files)}
            multiple
            accept="image/*,.pdf"
            className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56ccf2] focus:border-[#56ccf2] transition-all text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#56ccf2] file:text-white hover:file:bg-[#45b8e0] file:cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Images ou PDF, maximum 5 Mo par fichier
          </p>
        </div> */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#56ccf2] text-white py-3 rounded-lg font-semibold text-base hover:bg-[#45b8e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Envoi en cours...
            </span>
          ) : (
            'Envoyer mon message futur'
          )}
        </button>
      </div>
    </form>
  );
}

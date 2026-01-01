'use client';

import AdaptiveLogo from './AdaptiveLogo';
// import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  variant?: 'header' | 'footer';
}

export default function Header({ variant = 'header' }: HeaderProps) {
  if (variant === 'footer') {
    return (
      <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <AdaptiveLogo
            width={140}
            height={35}
            className="h-7 w-auto mx-auto mb-3"
          />
          <p className="text-gray-600 dark:text-gray-300 text-sm">Envoyez un message à votre futur vous</p>
        </div>
      </footer>
    );
  }

  return (
    <header className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <AdaptiveLogo
          width={180}
          height={45}
          priority
          className="h-10 w-auto"
        />
        {/* TODO: Revenir sur le ThemeToggle plus tard */}
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}

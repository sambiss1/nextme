'use client';

import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

interface SuccessAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

export default function SuccessAnimation({ show, onComplete }: SuccessAnimationProps) {
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={300}
      gravity={0.25}
      colors={['#F2C94C', '#56CCF2', '#FFD700', '#87CEEB', '#FFA500']}
      tweenDuration={4000}
      initialVelocityY={20}
    />
  );
}

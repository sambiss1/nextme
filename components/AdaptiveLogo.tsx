'use client';

import Image from 'next/image';

interface AdaptiveLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function AdaptiveLogo({
  width = 180,
  height = 45,
  className = '',
  priority = false
}: AdaptiveLogoProps) {
  // TODO: Revenir sur le système de thème plus tard

  return (
    <>
      <Image
        src="/logo.png"
        alt="ProchainMoi"
        width={width}
        height={height}
        priority={priority}
        className={`${className} dark:hidden`}
      />
      <Image
        src="/logo_light.png"
        alt="ProchainMoi"
        width={width}
        height={height}
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}

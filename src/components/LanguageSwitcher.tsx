    'use client'
import { useRouter, usePathname } from 'next/navigation';

const locales = ['fr', 'en'];

export default function LanguageSwitcher({ current }: { current: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (locale: string) => {
    const parts = pathname.split('/');
    parts[1] = locale; // remplace le préfix de langue
    router.push(parts.join('/') || `/${locale}`);
  };

  return (
    <div className="flex gap-2">
      {locales.map(l => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={l === current ? 'font-bold' : ''}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

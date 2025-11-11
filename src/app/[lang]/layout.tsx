import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { I18nProvider } from '@/lib/i18n';
import '@/styles/globals.css'; // le @ = src/
import { use } from 'react'; // React 18+ App Router

const SUPPORTED_LOCALES = ['fr', 'en'];

export const generateStaticParams = async () =>
  SUPPORTED_LOCALES.map((lang) => ({ lang }));

export default async function LocaleLayout({
  children,
  params: rawParams,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>; // <-- params est maintenant une Promise
}) {
  // ⚠️ déstructure params correctement
  const { lang } = await rawParams;

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }

const common = (await import(`@/locales/${lang}/common.json`)).default;
const auth = (await import(`@/locales/${lang}/auth.json`)).default;
const messages = { ...common, ...auth };


  return (
    <html lang={lang}>
      <body>
        {/* @ts-ignore */}
        <I18nProvider locale={lang} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

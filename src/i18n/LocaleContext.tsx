import React, { createContext, useContext, useMemo, useState } from 'react';
import { Locale, TranslationShape, translations } from './translations';

export type { Locale };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationShape;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const DEFAULT_LOCALE: Locale = 'ja';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

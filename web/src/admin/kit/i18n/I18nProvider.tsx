'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  formatMessage,
  LANG_STORAGE_KEY,
  localeTag,
  readStoredLocale,
  type Locale,
  type MessageKey,
} from "./translations";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  localeTag: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === "undefined" ? "uz" : readStoredLocale()
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      formatMessage(locale, key, vars),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, localeTag: localeTag(locale) }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
}

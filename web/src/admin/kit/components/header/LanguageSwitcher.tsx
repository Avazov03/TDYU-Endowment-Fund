'use client'
import { LOCALES } from "@/admin/kit/i18n/translations";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-800 dark:bg-white/[0.03]"
      role="group"
      aria-label={t("header.language")}
    >
      {LOCALES.map((item) => {
        const active = item.id === locale;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id)}
            title={item.label}
            className={`h-8 min-w-9 rounded-md px-2 text-xs font-semibold ${
              active
                ? "bg-brand-500 text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/80"
            }`}
          >
            {item.short}
          </button>
        );
      })}
    </div>
  );
}

'use client'
import type { ReactNode } from "react";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function DemoPageShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-center text-theme-xs text-gray-500 dark:border-gray-700 dark:bg-white/[0.02] dark:text-gray-400">
        {t("common.demoPreview")}
      </p>
      <div className="pointer-events-none select-none opacity-45 saturate-[0.55] contrast-[0.95]">
        {children}
      </div>
    </div>
  );
}

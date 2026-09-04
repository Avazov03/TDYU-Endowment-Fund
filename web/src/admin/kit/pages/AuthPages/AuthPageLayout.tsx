'use client'
import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import BrandLogo from "../../components/common/BrandLogo";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs px-6">
              <a href="/uz" className="block mb-5" aria-label="TDYU">
                <BrandLogo variant="auth" />
              </a>
              <p className="text-center text-sm leading-6 text-gray-400 dark:text-white/60">
                {t("login.subtitle")}
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}

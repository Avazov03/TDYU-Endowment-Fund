'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@/admin/kit/next-nav";
import { ADMIN_SEARCH_PAGES } from "@/admin/kit/context/DemoWorkspace";
import { useI18n } from "@/admin/kit/i18n/I18nProvider";

export default function HeaderSearch() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_SEARCH_PAGES.slice(0, 8);
    return ADMIN_SEARCH_PAGES.filter((page) =>
      `${t(page.name)} ${page.path}`.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, t]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative hidden lg:block">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) go(results[0].path);
        }}
      >
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 150)}
            placeholder={t("header.search")}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
          >
            <span> ⌘ </span>
            <span> K </span>
          </button>
        </div>
      </form>
      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">{t("header.searchEmpty")}</p>
          ) : (
            results.map((page) => (
              <button
                key={page.path}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(page.path)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/[0.04]"
              >
                <span>{t(page.name)}</span>
                <span className="text-theme-xs text-gray-400">{page.path}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

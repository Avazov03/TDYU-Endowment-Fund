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
import { useI18n } from "@/admin/kit/i18n/I18nProvider";
import type { MessageKey } from "@/admin/kit/i18n/translations";

export type DemoToastKind =
  | "saved"
  | "deleted"
  | "added"
  | "sent"
  | "exported"
  | "filtered"
  | "uploaded"
  | "connected"
  | "done"
  | "copied"
  | "password"
  | "loggedOut"
  | "accountDeleted"
  | "call"
  | "video"
  | "recording"
  | "attached";

const TOAST_KEYS: Record<DemoToastKind, MessageKey> = {
  saved: "demo.toastSaved",
  deleted: "demo.toastDeleted",
  added: "demo.toastAdded",
  sent: "demo.toastSent",
  exported: "demo.toastExported",
  filtered: "demo.toastFiltered",
  uploaded: "demo.toastUploaded",
  connected: "demo.toastConnected",
  done: "demo.toastDone",
  copied: "common.copied",
  password: "demo.toastPassword",
  loggedOut: "demo.toastLoggedOut",
  accountDeleted: "demo.toastAccountDeleted",
  call: "demo.callStarted",
  video: "demo.videoStarted",
  recording: "demo.recording",
  attached: "demo.fileAttached",
};

export type DemoProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  country: string;
  city: string;
  postal: string;
  taxId: string;
};

export type DemoNotice = {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  read: boolean;
};

const PROFILE_KEY = "yurist-admin-demo-profile";
const NOTICES_KEY = "yurist-admin-demo-notices";

const defaultProfile: DemoProfile = {
  firstName: "Admin",
  lastName: "Yurist",
  email: "admin@tdyu-endowment.uz",
  phone: "+998 90 000 00 00",
  bio: "Team Manager",
  role: "Administrator",
  facebook: "https://www.facebook.com/",
  twitter: "https://x.com/",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://instagram.com/",
  country: "O‘zbekiston",
  city: "Toshkent",
  postal: "100000",
  taxId: "YZ-000001",
};

function defaultNotices(): DemoNotice[] {
  return [
    {
      id: "n1",
      title: "Yangi AI savol",
      body: "Foydalanuvchi mehnat shartnomasi bo‘yicha savol yubordi.",
      time: "10:24",
      href: "/admin/contacts",
      read: false,
    },
    {
      id: "n2",
      title: "Yangi maslahat",
      body: "Konsultatsiya ticketi javob kutmoqda.",
      time: "09:12",
      href: "/admin/contacts",
      read: false,
    },
    {
      id: "n3",
      title: "RAG indeksi",
      body: "Hujjatlar indeksi muvaffaqiyatli yangilandi.",
      time: "Kecha",
      href: "/admin/documents",
      read: true,
    },
  ];
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...(fallback as object), ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

type DemoWorkspaceValue = {
  profile: DemoProfile;
  setProfile: (patch: Partial<DemoProfile>) => void;
  notices: DemoNotice[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  notify: (kind?: DemoToastKind, text?: string) => void;
  confirmDelete: (name?: string) => boolean;
};

const DemoWorkspaceContext = createContext<DemoWorkspaceValue | null>(null);

export function DemoWorkspaceProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [profile, setProfileState] = useState<DemoProfile>(() =>
    typeof window === "undefined" ? defaultProfile : readJson(PROFILE_KEY, defaultProfile)
  );
  const [notices, setNotices] = useState<DemoNotice[]>(() => {
    if (typeof window === "undefined") return defaultNotices();
    try {
      const raw = localStorage.getItem(NOTICES_KEY);
      if (raw) return JSON.parse(raw) as DemoNotice[];
    } catch {
      /* ignore */
    }
    return defaultNotices();
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTICES_KEY, JSON.stringify(notices));
    } catch {
      /* ignore */
    }
  }, [notices]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const setProfile = useCallback((patch: Partial<DemoProfile>) => {
    setProfileState((prev) => ({ ...prev, ...patch }));
  }, []);

  const notify = useCallback(
    (kind: DemoToastKind = "done", text?: string) => {
      setToast(text || t(TOAST_KEYS[kind]));
    },
    [t]
  );

  const confirmDelete = useCallback(
    (name?: string) =>
      window.confirm(t("common.confirmDelete", { name: name || t("common.delete") })),
    [t]
  );

  const markAllRead = useCallback(() => {
    setNotices((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const unreadCount = notices.filter((item) => !item.read).length;

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      notices,
      unreadCount,
      markAllRead,
      markRead,
      notify,
      confirmDelete,
    }),
    [profile, setProfile, notices, unreadCount, markAllRead, markRead, notify, confirmDelete]
  );

  return (
    <DemoWorkspaceContext.Provider value={value}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-999999 -translate-x-1/2">
          <div className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-theme-lg dark:bg-white dark:text-gray-900">
            {toast}
          </div>
        </div>
      )}
    </DemoWorkspaceContext.Provider>
  );
}

export function useDemoWorkspace() {
  const ctx = useContext(DemoWorkspaceContext);
  if (!ctx) {
    throw new Error("useDemoWorkspace must be used inside DemoWorkspaceProvider");
  }
  return ctx;
}

export const ADMIN_SEARCH_PAGES: { path: string; name: MessageKey }[] = [
  { path: "/admin", name: "nav.ecommerce" },
  { path: "/admin/finance", name: "nav.finance" },
  { path: "/admin/account", name: "nav.profile" },
  { path: "/admin/documents", name: "nav.fileManager" },
  { path: "/admin/contacts", name: "nav.aiQuestions" },
  { path: "/admin/donations", name: "nav.users" },
  { path: "/admin/grants", name: "nav.specialists" },
  { path: "/admin/events", name: "nav.templates" },
  { path: "/admin/news", name: "nav.notices" },
  { path: "/admin/announcements", name: "nav.announcements" },
  { path: "/admin/shop/products", name: "nav.ratings" },
  { path: "/admin/shop/orders", name: "nav.sales" },
  { path: "/admin/media", name: "nav.apiKeys" },
  { path: "/admin/alumni", name: "nav.ai" },
  { path: "/admin/staff", name: "nav.integrations" },
  { path: "/admin/login", name: "nav.signIn" },
];

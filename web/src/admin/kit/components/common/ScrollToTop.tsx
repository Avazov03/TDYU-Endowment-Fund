'use client'
import { useEffect } from "react";
import { useLocation } from "@/admin/kit/next-nav";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

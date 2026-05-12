"use client";

import { Home, BookOpen, Zap, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { key: "home", icon: Home, href: "/home" },
  { key: "modules", icon: BookOpen, href: "/modules" },
  { key: "field", icon: Zap, href: "/field" },
  { key: "me", icon: User, href: "/me" },
] as const;

const LABEL_KEYS: Record<string, string> = {
  home: "home",
  modules: "learn",
  field: "field",
  me: "me",
};

export function BottomNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const activeKey = NAV_ITEMS.find((it) => pathname.startsWith(it.href))?.key || "home";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 px-2 pt-2 pb-3 flex items-center justify-around z-50 max-w-lg mx-auto"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #E7E2D8",
      }}
    >
      {NAV_ITEMS.map((it) => {
        const isActive = activeKey === it.key;
        return (
          <button
            key={it.key}
            onClick={() => router.push(it.href)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition"
            style={{ color: isActive ? "#4B8EC8" : "#94A3B8" }}
          >
            <it.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{t(LABEL_KEYS[it.key])}</span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Check, type LucideIcon } from "lucide-react";

type Props = {
  earned?: boolean;
  label: string;
  icon: LucideIcon;
  color: string;
};

export function BadgeChip({ earned, label, icon: Icon, color }: Props) {
  return (
    <div className="flex flex-col items-center w-20 flex-shrink-0">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1.5 relative"
        style={{
          background: earned ? color : "#F1F5F9",
          opacity: earned ? 1 : 0.6,
        }}
      >
        <Icon size={28} color={earned ? "#fff" : "#94A3B8"} strokeWidth={2.2} />
        {earned && (
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#F4A621", border: "2px solid #fff" }}
          >
            <Check size={10} color="#fff" strokeWidth={3} />
          </div>
        )}
      </div>
      <div
        className="text-[10px] font-semibold text-center leading-tight"
        style={{ color: earned ? "#1F2A3A" : "#94A3B8" }}
      >
        {label}
      </div>
    </div>
  );
}

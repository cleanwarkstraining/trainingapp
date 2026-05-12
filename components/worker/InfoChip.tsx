"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
};

export function InfoChip({ icon: Icon, label, value, color }: Props) {
  return (
    <div className="rounded-xl p-3" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} color={color} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
          {label}
        </span>
      </div>
      <div className="text-sm font-bold font-display" style={{ color: "#1F2A3A" }}>
        {value}
      </div>
    </div>
  );
}

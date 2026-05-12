"use client";

type Props = {
  label: string;
  value: string;
  color: string;
};

export function Stat({ label, value, color }: Props) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: "#fff", border: "1.5px solid #E7E2D8" }}>
      <div className="font-extrabold text-2xl font-display" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#94A3B8" }}>
        {label}
      </div>
    </div>
  );
}

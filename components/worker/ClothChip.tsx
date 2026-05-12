"use client";

type Props = {
  color: string;
  label: string;
  border?: boolean;
};

export function ClothChip({ color, label, border }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-full aspect-square rounded-lg"
        style={{
          background: color,
          border: border ? "1.5px dashed #94A3B8" : "none",
        }}
      />
      <div className="text-[10px] font-semibold" style={{ color: "#475467" }}>
        {label}
      </div>
    </div>
  );
}

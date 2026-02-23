"use client";

import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { value: "new_feature", label: "New Feature", color: "#57C5B6" },
  { value: "bug_fix", label: "Bug Fix", color: "#E5484D" },
  { value: "improvement", label: "Improvement", color: "#B95126" },
  { value: "performance", label: "Performance", color: "#3B82F6" },
  { value: "ui_update", label: "UI Update", color: "#A0A0A8" },
] as const;

const CATEGORY_BG: Record<string, string> = {
  new_feature: "rgba(87, 197, 182, 0.15)",
  bug_fix: "rgba(229, 72, 77, 0.15)",
  improvement: "rgba(185, 81, 38, 0.15)",
  performance: "rgba(59, 130, 246, 0.15)",
  ui_update: "rgba(160, 160, 168, 0.15)",
};

// Map old AI category values to the new keys
const LEGACY_MAP: Record<string, string> = {
  feature: "new_feature",
  fix: "bug_fix",
  refactor: "improvement",
  docs: "improvement",
};

function resolveCategory(raw: string): string {
  if (CATEGORY_BG[raw]) return raw;
  return LEGACY_MAP[raw] ?? "improvement";
}

interface CategoryPickerProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryPicker({ category, onCategoryChange }: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resolved = resolveCategory(category);
  const current = CATEGORIES.find((c) => c.value === resolved) ?? CATEGORIES[2];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Pill trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-md px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase leading-tight transition-all"
        style={{
          color: current.color,
          backgroundColor: CATEGORY_BG[current.value],
          border: "1px solid transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = `1px solid ${current.color}4D`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "1px solid transparent";
        }}
      >
        {current.label}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[170px]"
          style={{
            background: "#1E1E24",
            border: "1px solid #2A2A30",
            borderRadius: 8,
            padding: 4,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                onCategoryChange(cat.value);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 transition-colors"
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                color: cat.value === current.value ? "#FFFFFF" : "#A0A0A8",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2A2A30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                className="shrink-0 rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: cat.color,
                }}
              />
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface CardLightboxProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

export function CardLightbox({ imageUrl, open, onClose }: CardLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-[101] flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        }}
        aria-label="Close lightbox"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Card image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Visual changelog card — full size"
        onClick={(e) => e.stopPropagation()}
        className="animate-in zoom-in-95 fade-in duration-200"
        style={{
          maxWidth: "90vw",
          maxHeight: "80vh",
          width: 1200,
          height: 675,
          objectFit: "contain",
          borderRadius: 12,
        }}
      />
    </div>,
    document.body
  );
}

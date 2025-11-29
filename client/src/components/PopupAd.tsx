"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PopupAdProps {
  children: React.ReactNode;
  delay?: number;
  showOnce?: boolean;
  cookieName?: string;
}

export default function PopupAd({
  children,
  delay = 2000,
  showOnce = false,
  cookieName = "popup-seen",
}: PopupAdProps) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showOnce && localStorage.getItem(cookieName)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setAnimate(true));
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, showOnce, cookieName]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setOpen(false);
      if (showOnce) {
        localStorage.setItem(cookieName, "true");
      }
    }, 300);
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[999] flex items-center justify-center 
      p-2 sm:p-4 transition-all duration-500
      ${animate ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"}`}
    >
      {/* POPUP BOX */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white dark:bg-black rounded-xl shadow-2xl relative 
          w-full max-w-sm sm:max-w-md
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${animate 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-6 scale-95"
          }
        `}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="
            absolute top-3 right-3 
            bg-black dark:bg-white text-white dark:text-black 
            p-1.5 rounded-full shadow-md 
            hover:scale-110 active:scale-95 transition-all
          "
        >
          <X size={18} />
        </button>

        {/* CONTENT SLOT */}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

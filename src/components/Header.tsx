"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { BrandMark, BrandWordmark } from "./BrandMark";
import { useBooking } from "./BookingContext";

interface HeaderProps {
  phone: string;
  phoneHref: string;
  addressShort: string;
  hoursShort: string;
}

const navLinks = [
  { href: "/#approach", label: "О клинике" },
  { href: "/#services", label: "Услуги" },
  { href: "/#doctors", label: "Врачи" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header({
  phone,
  phoneHref,
  addressShort,
  hoursShort,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E6E3DF] bg-[#FAF9F7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark className="h-10 w-10 shrink-0" />
            <BrandWordmark />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5C5C60] lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#121212]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 font-mono text-xs font-medium text-[#121212] transition-colors hover:text-[#C41625] sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-[#C41625]" strokeWidth={2} />
              {phone}
            </a>

            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-[#C41625] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#9A0F1B] active:scale-[0.98] md:inline-flex"
            >
              Записаться
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E3DF] bg-white text-[#121212] transition-colors hover:border-[#C41625] hover:text-[#C41625] lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-[#111113]/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col justify-between bg-[#FAF9F7] p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E6E3DF] pb-5">
                  <div className="flex items-center gap-3">
                    <BrandMark className="h-9 w-9" />
                    <BrandWordmark />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Закрыть меню"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E3DF] bg-white text-[#121212]"
                  >
                    <X className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col divide-y divide-[#E6E3DF]">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-xl font-semibold text-[#121212] transition-colors hover:text-[#C41625]"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#C41625]" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 border-t border-[#E6E3DF] pt-6">
                <div className="space-y-2 text-xs text-[#5C5C60]">
                  <p className="flex items-center gap-2 text-[#121212]">
                    <MapPin className="h-3.5 w-3.5 text-[#C41625]" />
                    {addressShort}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#C41625]" />
                    {hoursShort}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C41625] py-3.5 text-sm font-semibold text-white"
                >
                  Записаться на прием
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <a
                  href={phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E6E3DF] bg-white py-3 font-mono text-xs font-medium text-[#121212]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C41625]" />
                  {phone}
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

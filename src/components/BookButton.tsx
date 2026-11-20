"use client";

import type { ReactNode } from "react";
import { useBooking } from "./BookingContext";

interface BookButtonProps {
  prefill?: string;
  className?: string;
  children: ReactNode;
}

export function BookButton({ prefill, className = "", children }: BookButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(prefill)}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

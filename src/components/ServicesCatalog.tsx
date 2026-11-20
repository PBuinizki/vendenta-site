"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/lib/clinic";

export function ServicesCatalog({ services }: { services: ServiceItem[] }) {
  const categories = ["Все", ...Array.from(new Set(services.map((s) => s.category)))];
  const [active, setActive] = useState("Все");

  const visible =
    active === "Все"
      ? services
      : services.filter((item) => item.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "border border-[#E6E3DF] bg-white text-[#5C5C60] hover:border-[#121212] hover:text-[#121212]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="serviceCategoryPill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-[#C41625]"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      <div className="divide-y divide-[#E6E3DF] border-y border-[#E6E3DF]">
        {visible.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            prefetch={false}
            className="group grid gap-4 py-7 transition-colors hover:bg-white md:grid-cols-12 md:items-center md:px-5"
          >
            <div className="flex items-start gap-4 md:col-span-5">
              <span className="mt-1 font-mono text-xs font-medium text-[#C41625]">
                {service.code}
              </span>
              <div>
                <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#5C5C60]">
                  {service.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-[#121212] transition-colors group-hover:text-[#C41625]">
                  {service.title}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#5C5C60] md:col-span-4">
              {service.summary}
            </p>

            <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-5">
              <div className="md:text-right">
                <p className="text-xs font-semibold text-[#121212]">
                  {service.priceLabel}
                </p>
                <p className="mt-0.5 font-mono text-xs text-[#5C5C60]">
                  {service.duration}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6E3DF] bg-white text-[#121212] transition-all group-hover:border-[#C41625] group-hover:bg-[#C41625] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

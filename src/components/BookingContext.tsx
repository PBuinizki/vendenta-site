"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Phone, X } from "lucide-react";

interface BookingContextValue {
  openBooking: (prefill?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

interface BookingProviderProps {
  children: ReactNode;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  address: string;
  serviceOptions: string[];
}

function formatRuPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let clean = digits;
  if (clean.startsWith("8")) clean = "7" + clean.slice(1);
  if (clean.length > 0 && !clean.startsWith("7")) clean = "7" + clean;
  clean = clean.slice(0, 11);

  if (clean.length === 0) return "";
  if (clean.length <= 1) return "+7";
  if (clean.length <= 4) return `+7 (${clean.slice(1)}`;
  if (clean.length <= 7) return `+7 (${clean.slice(1, 4)}) ${clean.slice(4)}`;
  if (clean.length <= 9) {
    return `+7 (${clean.slice(1, 4)}) ${clean.slice(4, 7)}-${clean.slice(7)}`;
  }
  return `+7 (${clean.slice(1, 4)}) ${clean.slice(4, 7)}-${clean.slice(
    7,
    9
  )}-${clean.slice(9, 11)}`;
}

export function BookingProvider({
  children,
  phone,
  phoneHref,
  whatsappHref,
  address,
  serviceOptions,
}: BookingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(serviceOptions[0] ?? "");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("Ближайшее время");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const openBooking = useCallback(
    (prefill?: string) => {
      setError("");
      setStatus("idle");
      if (prefill) {
        setSelectedTopic(prefill);
      } else if (serviceOptions[0]) {
        setSelectedTopic(serviceOptions[0]);
      }
      setIsOpen(true);
    },
    [serviceOptions]
  );

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeBooking]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const digitsCount = patientPhone.replace(/\D/g, "").length;
    if (patientName.trim().length < 2) {
      setError("Укажите, пожалуйста, ваше имя.");
      return;
    }
    if (digitsCount < 11) {
      setError("Введите корректный номер телефона.");
      return;
    }

    setError("");
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 450);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      setStatus("idle");
      setPatientName("");
      setPatientPhone("");
    }, 250);
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="absolute inset-0 bg-[#111113]/65 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#E6E3DF] bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#EFECE8] px-7 py-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#C41625]">
                    Онлайн-запись · Vendenta
                  </p>
                  <h2
                    id="booking-modal-title"
                    className="mt-1.5 text-2xl font-bold text-[#121212]"
                  >
                    {status === "success"
                      ? "Заявка принята"
                      : "Записаться на прием"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  aria-label="Закрыть окно"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E6E3DF] text-[#5C5C60] transition-colors hover:border-[#121212] hover:text-[#121212]"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="p-7">
                {status === "success" ? (
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E8EA] text-[#C41625]">
                      <Check className="h-6 w-6" strokeWidth={2.25} />
                    </div>
                    <p className="mt-5 text-base leading-relaxed text-[#121212]">
                      Спасибо, <span className="font-semibold">{patientName}</span>.
                      Администратор клиники свяжется с вами по номеру{" "}
                      <span className="font-mono font-medium">{patientPhone}</span>,
                      чтобы подтвердить удобное время.
                    </p>
                    <div className="mt-5 rounded-2xl bg-[#FAF9F7] p-4 text-xs text-[#5C5C60]">
                      <p>
                        <strong className="text-[#121212]">Направление:</strong>{" "}
                        {selectedTopic}
                      </p>
                      <p className="mt-1">
                        <strong className="text-[#121212]">Адрес:</strong> {address}
                      </p>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="cursor-pointer rounded-full bg-[#121212] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A2A2E]"
                      >
                        Вернуться на сайт
                      </button>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E3DF] px-5 py-3 text-sm font-medium text-[#121212] transition-colors hover:border-[#C41625] hover:text-[#C41625]"
                      >
                        Написать в WhatsApp
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#5C5C60]">
                        Направление или врач
                      </label>
                      <input
                        type="text"
                        list="vendenta-topics"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full rounded-xl border border-[#E6E3DF] bg-[#FAF9F7] px-4 py-3 text-sm text-[#121212] outline-none transition-colors focus:border-[#C41625] focus:bg-white"
                      />
                      <datalist id="vendenta-topics">
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#5C5C60]">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Александр"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full rounded-xl border border-[#E6E3DF] bg-[#FAF9F7] px-4 py-3 text-sm text-[#121212] outline-none transition-colors focus:border-[#C41625] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#5C5C60]">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (969) 000-00-00"
                          value={patientPhone}
                          onChange={(e) =>
                            setPatientPhone(formatRuPhone(e.target.value))
                          }
                          className="w-full rounded-xl border border-[#E6E3DF] bg-[#FAF9F7] px-4 py-3 font-mono text-sm text-[#121212] outline-none transition-colors focus:border-[#C41625] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#5C5C60]">
                        Удобное время звонка
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Ближайшее время", "Утро (09–13)", "Вечер (15–20)"].map(
                          (slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setPreferredTime(slot)}
                              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                                preferredTime === slot
                                  ? "border-[#C41625] bg-[#F7E8EA] text-[#9A0F1B]"
                                  : "border-[#E6E3DF] bg-white text-[#5C5C60] hover:border-[#121212]"
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {error && (
                      <p className="text-xs font-medium text-[#C41625]">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C41625] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#9A0F1B] disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? "Отправляем заявку..."
                        : "Отправить заявку"}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EFECE8] pt-4 text-xs text-[#5C5C60]">
                      <span>Или позвоните напрямую:</span>
                      <a
                        href={phoneHref}
                        className="inline-flex items-center gap-1.5 font-mono font-medium text-[#121212] transition-colors hover:text-[#C41625]"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#C41625]" />
                        {phone}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

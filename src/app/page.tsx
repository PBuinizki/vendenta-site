import {
  ArrowUpRight,
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  Phone,
  ScanLine,
  ShieldCheck,
  Star,
} from "lucide-react";
import { getClinicData } from "@/lib/clinic";
import { Header } from "@/components/Header";
import { BrandMark, BrandWordmark } from "@/components/BrandMark";
import { BookButton } from "@/components/BookButton";
import { Reveal } from "@/components/Reveal";
import { ServicesCatalog } from "@/components/ServicesCatalog";

export const dynamic = "force-static";

export default async function HomePage() {
  const clinic = await getClinicData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${clinic.name} — ${clinic.legalSubtitle}`,
    telephone: clinic.contacts.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Комсомольская ул., 80, 1 этаж",
      addressLocality: clinic.city,
      addressRegion: "Московская область",
      postalCode: "142400",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.contacts.coordinates.lat,
      longitude: clinic.contacts.coordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating.score,
      reviewCount: clinic.rating.votes,
      bestRating: "5",
    },
    openingHours: ["Mo-Fr 09:00-20:00", "Sa 09:00-19:00"],
    sameAs: [clinic.contacts.yandexOrgUrl],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header
        phone={clinic.contacts.phone}
        phoneHref={clinic.contacts.phoneHref}
        addressShort={clinic.contacts.addressShort}
        hoursShort={clinic.contacts.hoursShort}
      />

      <main>
        {/* 1. Hero — Swiss Clinical Editorial */}
        <section className="relative overflow-hidden border-b border-[#E6E3DF] bg-clinical-grid">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF9F7] to-transparent" />

          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-7">
                <div className="mb-7 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#E6E3DF] bg-white px-4 py-1.5 text-xs shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-[#C41625]" />
                  <span className="font-semibold text-[#121212]">
                    {clinic.legalSubtitle}
                  </span>
                  <span className="text-[#C7C2BC]">/</span>
                  <span className="font-mono text-[#5C5C60]">
                    Ногинск · Комсомольская, 80
                  </span>
                </div>

                <h1 className="text-4xl font-bold leading-[1.04] text-[#121212] sm:text-5xl lg:text-[58px]">
                  {clinic.heroHeadline}
                </h1>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-[#5C5C60] sm:text-lg">
                  {clinic.heroLead}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3.5">
                  <BookButton className="inline-flex items-center gap-2.5 rounded-full bg-[#C41625] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(196,22,37,0.55)] transition-all hover:-translate-y-0.5 hover:bg-[#9A0F1B] active:translate-y-0">
                    <Calendar className="h-4 w-4" strokeWidth={1.75} />
                    Записаться на прием
                  </BookButton>

                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 rounded-full border border-[#D6D1CA] bg-white px-7 py-4 text-sm font-semibold text-[#121212] transition-colors hover:border-[#121212]"
                  >
                    Направления клиники
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </div>

                {/* Быстрая лента преимуществ */}
                <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[#E6E3DF] pt-7 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#121212]">
                    <ScanLine className="h-4 w-4 shrink-0 text-[#C41625]" />
                    <span>КТ, ОПТГ и снимки на месте</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#121212]">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#C41625]" />
                    <span>Взрослый и детский прием</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#121212]">
                    <CreditCard className="h-4 w-4 shrink-0 text-[#C41625]" />
                    <span>Оплата частями</span>
                  </div>
                </div>
              </Reveal>

              {/* Правая визитная карточка клиники с реальными данными */}
              <Reveal delay={0.1} className="lg:col-span-5">
                <div className="overflow-hidden rounded-3xl border border-[#E6E3DF] bg-white shadow-[0_24px_60px_-28px_rgba(18,18,18,0.16)]">
                  <div className="flex items-center justify-between bg-[#C41625] px-7 py-6 text-white">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                        {clinic.rating.source}
                      </p>
                      <div className="mt-1.5 flex items-baseline gap-2.5">
                        <span className="font-display text-5xl font-bold leading-none">
                          {clinic.rating.score}
                        </span>
                        <span className="text-xs text-white/85">
                          {clinic.rating.votes} оценка · {clinic.rating.reviewsCount} отзыва
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-white">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-white"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-7">
                    <dl className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#C41625]"
                          strokeWidth={1.75}
                        />
                        <div>
                          <dt className="text-xs text-[#5C5C60]">Адрес клиники</dt>
                          <dd className="mt-0.5 font-medium text-[#121212]">
                            {clinic.contacts.addressShort}
                          </dd>
                          <dd className="mt-0.5 text-xs text-[#5C5C60]">
                            {clinic.contacts.districtNote}
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#C41625]"
                          strokeWidth={1.75}
                        />
                        <div className="w-full">
                          <dt className="text-xs text-[#5C5C60]">Часы работы</dt>
                          <dd className="mt-1 space-y-1">
                            {clinic.contacts.schedule.map((row) => (
                              <div
                                key={row.days}
                                className="flex items-center justify-between text-xs"
                              >
                                <span className="text-[#5C5C60]">{row.days}</span>
                                <span className="font-mono font-medium text-[#121212]">
                                  {row.time}
                                </span>
                              </div>
                            ))}
                          </dd>
                        </div>
                      </div>
                    </dl>

                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      <a
                        href={clinic.contacts.phoneHref}
                        className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#121212] py-3 font-mono text-xs font-medium text-white transition-colors hover:bg-[#2A2A2E]"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Позвонить
                      </a>
                      <a
                        href={clinic.contacts.yandexOrgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-2xl border border-[#E6E3DF] bg-[#FAF9F7] py-3 text-xs font-semibold text-[#121212] transition-colors hover:border-[#C41625] hover:bg-[#F7E8EA] hover:text-[#9A0F1B]"
                      >
                        На карте
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. О клинике и стандарты приема */}
        <section id="approach" className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#C41625]">
                  О клинике
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#121212]">
                  Спокойный прием и понятный результат
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#5C5C60]">
                  Построили работу так, чтобы пациент понимал каждый этап — от
                  первого снимка до финального осмотра.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-3xl border border-[#E6E3DF] bg-[#E6E3DF] sm:grid-cols-2 lg:col-span-8">
                {clinic.highlights.map((item) => (
                  <div key={item.index} className="bg-white p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-[#C41625]">
                        {item.index}
                      </span>
                      <span className="font-mono text-[11px] text-[#5C5C60]">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#121212]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#5C5C60]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. Услуги клиники */}
        <section
          id="services"
          className="border-t border-[#E6E3DF] bg-[#FAF9F7] py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#C41625]">
                  Направления
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#121212] md:text-4xl">
                  Услуги клиники
                </h2>
              </div>
              <p className="max-w-sm text-sm text-[#5C5C60]">
                Откройте любое направление, чтобы посмотреть этапы приема и
                записаться на консультацию.
              </p>
            </Reveal>

            <ServicesCatalog services={clinic.services} />
          </div>
        </section>

        {/* 4. Врачи клиники (реальные специалисты из отзывов) */}
        <section
          id="doctors"
          className="border-t border-[#E6E3DF] bg-white py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#C41625]">
                  Команда
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#121212] md:text-4xl">
                  Специалисты {clinic.name}
                </h2>
              </div>
              <p className="max-w-sm text-sm text-[#5C5C60]">
                Врачи, которых пациенты чаще всего рекомендуют в отзывах на
                Яндекс.Картах.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {clinic.doctors.map((doc, idx) => (
                <Reveal key={doc.name} delay={idx * 0.07}>
                  <article className="group flex h-full flex-col justify-between rounded-3xl border border-[#E6E3DF] bg-[#FAF9F7] p-7 transition-colors hover:border-[#C41625]/50 hover:bg-white">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#121212] font-mono text-sm font-medium text-white transition-colors group-hover:bg-[#C41625]">
                          {doc.initials}
                        </span>
                        <span className="rounded-full bg-[#F7E8EA] px-3 py-1 font-mono text-[11px] font-medium text-[#9A0F1B]">
                          {doc.badge}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-[#121212]">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#C41625]">
                        {doc.role}
                      </p>
                      <p className="mt-5 border-t border-[#E6E3DF] pt-5 text-sm leading-relaxed text-[#5C5C60]">
                        {doc.focus}
                      </p>
                    </div>

                    <BookButton
                      prefill={`Прием у врача: ${doc.name}`}
                      className="mt-7 inline-flex w-full items-center justify-between rounded-2xl border border-[#E6E3DF] bg-white px-4 py-3 text-xs font-semibold text-[#121212] transition-colors hover:border-[#C41625] hover:bg-[#C41625] hover:text-white"
                    >
                      <span>Записаться к специалисту</span>
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </BookButton>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Реальные отзывы с Яндекс.Карт */}
        <section
          id="reviews"
          className="border-t border-[#E6E3DF] bg-[#FAF9F7] py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#C41625]">
                  Яндекс.Карты · Рейтинг {clinic.rating.score} из 5.0
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#121212] md:text-4xl">
                  Отзывы пациентов
                </h2>
              </div>
              <a
                href={clinic.contacts.yandexReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#121212] underline decoration-[#C41625] underline-offset-4 transition-colors hover:text-[#C41625]"
              >
                Читать все {clinic.rating.reviewsCount} отзыва
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {clinic.reviews.map((review, idx) => (
                <Reveal key={review.author} delay={idx * 0.07}>
                  <article className="flex h-full flex-col justify-between rounded-3xl border border-[#E6E3DF] bg-white p-7">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-[#C41625]">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-[#C41625]"
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-[#5C5C60]">
                          {review.date}
                        </span>
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-[#121212]">
                        «{review.text}»
                      </p>
                    </div>

                    <div className="mt-7 border-t border-[#EFECE8] pt-4">
                      <p className="text-sm font-semibold text-[#121212]">
                        {review.author}
                      </p>
                      <p className="mt-0.5 text-xs text-[#5C5C60]">
                        {review.level}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Контакты и интерактивная Яндекс.Карта */}
        <section id="contacts" className="bg-[#111113] py-24 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="flex items-center gap-3">
                    <BrandMark className="h-10 w-10" />
                    <BrandWordmark dark />
                  </div>

                  <h2 className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">
                    {clinic.contacts.addressShort}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                    {clinic.contacts.addressFull}
                  </p>

                  <div className="mt-8 space-y-2 border-y border-white/10 py-6">
                    {clinic.contacts.schedule.map((row) => (
                      <div
                        key={row.days}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#A1A1AA]">{row.days}</span>
                        <span className="font-mono text-white">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={clinic.contacts.phoneHref}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C41625] px-6 py-3.5 font-mono text-sm font-medium text-white transition-colors hover:bg-[#9A0F1B]"
                    >
                      <Phone className="h-4 w-4" strokeWidth={1.75} />
                      {clinic.contacts.phone}
                    </a>
                    <a
                      href={clinic.contacts.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                      WhatsApp
                    </a>
                  </div>

                  <BookButton className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                    Оставить заявку онлайн
                    <ArrowUpRight className="h-4 w-4" />
                  </BookButton>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1F] lg:col-span-7">
                <iframe
                  title="Расположение стоматологической клиники Vendenta на Яндекс.Картах"
                  src={clinic.contacts.yandexWidgetUrl}
                  loading="lazy"
                  className="h-[380px] w-full border-0 lg:h-full lg:min-h-[440px]"
                  allowFullScreen
                />
              </div>
            </div>

            <footer className="mt-16 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-[#71717A] sm:flex-row">
              <p>
                © {new Date().getFullYear()} {clinic.name}. {clinic.legalSubtitle}, г.{" "}
                {clinic.city}.
              </p>
              <p>Имеются противопоказания. Необходима консультация специалиста.</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

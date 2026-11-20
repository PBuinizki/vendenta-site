import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Check, Phone } from "lucide-react";
import { getClinicData, getServiceBySlug } from "@/lib/clinic";
import { Header } from "@/components/Header";
import { BookButton } from "@/components/BookButton";

export async function generateStaticParams() {
  const clinic = await getClinicData();
  return clinic.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [clinic, service] = await Promise.all([
    getClinicData(),
    getServiceBySlug(slug),
  ]);

  if (!service) {
    return { title: `Услуга не найдена — ${clinic.name}` };
  }

  return {
    title: `${service.title} — ${clinic.name} (${clinic.city})`,
    description: `${service.summary} Запись по телефону ${clinic.contacts.phone}, ${clinic.contacts.addressShort}.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [clinic, service] = await Promise.all([
    getClinicData(),
    getServiceBySlug(slug),
  ]);

  if (!service) notFound();

  const otherServices = clinic.services.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Header
        phone={clinic.contacts.phone}
        phoneHref={clinic.contacts.phoneHref}
        addressShort={clinic.contacts.addressShort}
        hoursShort={clinic.contacts.hoursShort}
      />

      <main className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <Link
          href="/#services"
          prefetch={false}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5C5C60] transition-colors hover:text-[#C41625]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Все направления клиники
        </Link>

        <article className="mt-8 rounded-3xl border border-[#E6E3DF] bg-white p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-medium text-[#C41625]">
              {service.code} / {service.category}
            </span>
            <span className="rounded-full bg-[#F7E8EA] px-3.5 py-1 text-xs font-semibold text-[#9A0F1B]">
              {service.priceLabel}
            </span>
            <span className="font-mono text-xs text-[#5C5C60]">
              {service.duration}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#121212] md:text-4xl">
            {service.title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-[#5C5C60]">
            {service.details}
          </p>

          <div className="mt-10 border-t border-[#EFECE8] pt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#5C5C60]">
              Как проходит прием
            </h2>
            <ol className="mt-5 space-y-3.5">
              {service.stages.map((stage) => (
                <li
                  key={stage}
                  className="flex items-start gap-3 text-sm text-[#121212]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7E8EA] text-[#C41625]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span>{stage}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[#EFECE8] pt-8">
            <BookButton
              prefill={service.title}
              className="inline-flex items-center gap-2 rounded-full bg-[#C41625] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#9A0F1B]"
            >
              <Calendar className="h-4 w-4" strokeWidth={1.75} />
              Записаться на прием
            </BookButton>

            <a
              href={clinic.contacts.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#E6E3DF] px-6 py-3.5 font-mono text-xs font-medium text-[#121212] transition-colors hover:border-[#121212]"
            >
              <Phone className="h-3.5 w-3.5 text-[#C41625]" />
              {clinic.contacts.phone}
            </a>
          </div>
        </article>

        <section className="mt-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#5C5C60]">
            Другие направления
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherServices.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                prefetch={false}
                className="group flex items-center justify-between rounded-2xl border border-[#E6E3DF] bg-white p-5 transition-colors hover:border-[#C41625]"
              >
                <div>
                  <span className="font-mono text-[11px] text-[#C41625]">
                    {item.category}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-[#121212] group-hover:text-[#C41625]">
                    {item.title}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5C5C60] group-hover:text-[#C41625]" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import type { MetadataRoute } from "next";
import { getClinicData } from "@/lib/clinic";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const clinic = await getClinicData();
  const base = clinic.siteUrl;

  const serviceEntries = clinic.services.map((service) => ({
    url: `${base}/services/${service.slug}/`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
    },
    ...serviceEntries,
  ];
}

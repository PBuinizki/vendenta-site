import clinicJson from "@/data/clinic.json";

export type ClinicData = typeof clinicJson;
export type ServiceItem = ClinicData["services"][number];
export type DoctorItem = ClinicData["doctors"][number];

// Единая точка доступа к контенту для последующей миграции на Headless CMS (Strapi / Sanity / Directus).
export async function getClinicData(): Promise<ClinicData> {
  return clinicJson;
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceItem | undefined> {
  return clinicJson.services.find((item) => item.slug === slug);
}

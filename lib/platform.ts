export type ProductRole = "farmer" | "financier" | "commercial";

const configuredUrl = import.meta.env.VITE_PLATFORM_URL?.trim();
const defaultUrl = import.meta.env.DEV ? "http://localhost:3000" : "https://app.geoharvest.org";

function resolvePlatformUrl(value: string | undefined): string {
  if (!value) return defaultUrl;
  try {
    const url = new URL(value);
    if ((url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password) {
      url.search = "";
      url.hash = "";
      return url.toString().replace(/\/$/, "");
    }
  } catch { /* Fall back to the documented environment default. */ }
  return defaultUrl;
}

export const PLATFORM_URL = resolvePlatformUrl(configuredUrl);
export const PILOT_EMAIL = "mailto:support@geoharvest.org?subject=GeoHarvest%20pilot%20interest";

export function demoUrl(role?: ProductRole) {
  return `${PLATFORM_URL}/login${role ? `?role=${role}` : ""}`;
}

import { ROUTES } from "./routes";

export interface ScanPlatformPage {
  href: string;
  id: string;
  name: string;
}

export const SCAN_PLATFORM_PAGES: ScanPlatformPage[] = [
  { href: ROUTES.SCAN_REDDIT, id: "reddit", name: "Reddit" },
  { href: ROUTES.SCAN_SNAPCHAT, id: "snapchat", name: "Snapchat" },
];
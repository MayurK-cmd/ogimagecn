import type { ScanPlatformId } from "@/components/og-tester";
import { ROUTES } from "@/constants/routes";
import { SCAN_PLATFORM_PAGES } from "@/constants/scan";

export const otherScanPages = (platform?: ScanPlatformId) => {
  const others = SCAN_PLATFORM_PAGES.filter((page) => page.id !== platform);

  return platform
    ? [...others, { href: ROUTES.SCAN, name: "All platforms" }]
    : others;
};

export const scanBreadcrumbs = (platform?: ScanPlatformId) => {
  const current = SCAN_PLATFORM_PAGES.find((page) => page.id === platform);

  return [
    { name: "Home", path: ROUTES.HOME },
    { name: "Scan", path: ROUTES.SCAN },
    ...(current ? [{ name: current.name, path: current.href }] : []),
  ];
};

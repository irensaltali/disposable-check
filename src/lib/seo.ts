export const SITE_URL = "https://disposablecheck.com";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

const STATIC_ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/bulk": "Bulk Email Check",
  "/report": "Report Disposable Domain",
  "/docs": "Disposable Email API Documentation",
  "/get-api-key": "Get Free API Key",
  "/terms": "Terms of Service",
  "/the-disposable-email-epidemic": "Disposable Email Research",
  "/value-proposition": "Disposable Email Checker Value Proposition",
};

const formatSlug = (segment: string) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const normalizePath = (path: string) => {
  if (!path) return "/";
  const noQuery = path.split("?")[0].split("#")[0] || "/";
  if (noQuery.length > 1 && noQuery.endsWith("/")) {
    return noQuery.slice(0, -1);
  }
  return noQuery;
};

export const toAbsoluteUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return SITE_URL;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, SITE_URL).toString();
};

export const buildBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === "/") {
    return [{ name: "Home", path: "/" }];
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: STATIC_ROUTE_LABELS[currentPath] ?? formatSlug(segment),
      path: currentPath,
    });
  }

  return breadcrumbs;
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

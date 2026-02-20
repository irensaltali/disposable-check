import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildBreadcrumbSchema, buildBreadcrumbs, normalizePath, toAbsoluteUrl } from "@/lib/seo";

interface HreflangAlternate {
  hrefLang: string;
  href: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  path?: string;
  robots?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  alternates?: HreflangAlternate[];
}

const upsertMetaTag = (attribute: "name" | "property", key: string, content: string) => {
  let meta = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.content = content;
  meta.dataset.seoManaged = "true";
};

const upsertCanonicalLink = (href: string) => {
  let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.href = href;
  canonicalLink.dataset.seoManaged = "true";
};

export function SeoHead({
  title,
  description,
  type = "website",
  image = "/og-image.png",
  path,
  robots = "index,follow",
  schema,
  alternates,
}: SeoHeadProps) {
  const location = useLocation();

  useEffect(() => {
    const resolvedAlternates = alternates ?? [];
    const currentPath = normalizePath(path ?? location.pathname);
    const canonicalUrl = toAbsoluteUrl(currentPath);
    const imageUrl = toAbsoluteUrl(image);
    const breadcrumbSchema = buildBreadcrumbSchema(buildBreadcrumbs(currentPath));
    const customSchemas = !schema ? [] : Array.isArray(schema) ? schema : [schema];
    const allSchemas = [...customSchemas, breadcrumbSchema];

    document.title = title;
    document.documentElement.lang = "en";

    document.head.querySelectorAll('meta[name="keywords"]').forEach((tag) => tag.remove());
    document.head
      .querySelectorAll('link[rel="alternate"][data-seo-managed="true"], script[type="application/ld+json"][data-seo-managed="true"]')
      .forEach((node) => node.remove());

    upsertMetaTag("name", "description", description);
    upsertMetaTag("name", "robots", robots);
    upsertMetaTag("property", "og:title", title);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("property", "og:type", type);
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:image", imageUrl);
    upsertMetaTag("property", "og:locale", "en_US");
    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", title);
    upsertMetaTag("name", "twitter:description", description);
    upsertMetaTag("name", "twitter:image", imageUrl);

    upsertCanonicalLink(canonicalUrl);

    if (resolvedAlternates.length > 0) {
      const alternateUrls = [{ hrefLang: "en", href: canonicalUrl }, ...resolvedAlternates];
      alternateUrls.forEach((alternate) => {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = alternate.hrefLang;
        link.href = toAbsoluteUrl(alternate.href);
        link.dataset.seoManaged = "true";
        document.head.appendChild(link);
      });
    }

    allSchemas.forEach((schemaObject) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoManaged = "true";
      script.text = JSON.stringify(schemaObject);
      document.head.appendChild(script);
    });
  }, [alternates, description, image, location.pathname, path, robots, schema, title, type]);

  return null;
}

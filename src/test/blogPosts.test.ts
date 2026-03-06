import { describe, expect, it } from "vitest";
import { blogPosts, blogRouteLabels, blogSitemapRoutes } from "@/content/blogPosts";

describe("blog post content integrity", () => {
  it("contains five unique posts with required fields", () => {
    expect(blogPosts).toHaveLength(5);

    const slugs = new Set<string>();
    const primaryKeywords = new Set<string>();

    blogPosts.forEach((post) => {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.primaryKeyword).toBeTruthy();
      expect(post.secondaryKeyword).toBeTruthy();
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readingTime).toBeTruthy();
      expect(post.h1).toBeTruthy();
      expect(post.intro.length).toBeGreaterThan(0);
      expect(post.keyTakeaways.length).toBeGreaterThan(0);
      expect(post.sections.length).toBeGreaterThanOrEqual(4);
      expect(post.faq.length).toBeGreaterThan(0);
      expect(post.relatedSlugs.length).toBeGreaterThan(0);
      expect(post.cta.primaryHref).toBeTruthy();
      expect(post.cta.secondaryHref).toBeTruthy();

      expect(slugs.has(post.slug)).toBe(false);
      expect(primaryKeywords.has(post.primaryKeyword)).toBe(false);

      slugs.add(post.slug);
      primaryKeywords.add(post.primaryKeyword);
    });
  });

  it("keeps sitemap and route labels in sync with the posts", () => {
    expect(blogSitemapRoutes).toContain("/blog");
    expect(blogRouteLabels["/blog"]).toBe("Blog");

    blogPosts.forEach((post) => {
      expect(blogSitemapRoutes).toContain(`/blog/${post.slug}`);
      expect(blogRouteLabels[`/blog/${post.slug}`]).toBe(post.title);

      post.relatedSlugs.forEach((relatedSlug) => {
        expect(blogPosts.some((candidate) => candidate.slug === relatedSlug)).toBe(true);
      });
    });
  });
});

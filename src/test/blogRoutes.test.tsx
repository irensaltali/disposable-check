import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

const renderRoute = (initialEntry: string, path: string, element: ReactElement) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>,
  );

const clearSeoArtifacts = () => {
  document
    .querySelectorAll('[data-seo-managed="true"]')
    .forEach((node) => node.parentNode?.removeChild(node));
};

afterEach(() => {
  clearSeoArtifacts();
  document.title = "";
});

describe("blog routes", () => {
  it("renders the blog hub with five article cards", () => {
    renderRoute("/blog", "/blog", <Blog />);

    expect(screen.getByRole("heading", { level: 1, name: /disposable email detection blog/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /read article/i })).toHaveLength(5);
  });

  it("renders an article page with FAQ, CTA, related links, and JSON-LD", async () => {
    renderRoute("/blog/check-disposable-email-address", "/blog/:slug", <BlogPost />);

    expect(
      screen.getByRole("heading", { level: 1, name: /how to check disposable email address risk during signup/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /validate an address/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all posts/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toContain("How to Check Disposable Email Address Risk During Signup");
    });

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://disposablecheck.com/blog/check-disposable-email-address",
    );

    const schemas = Array.from(
      document.querySelectorAll('script[type="application/ld+json"][data-seo-managed="true"]'),
    ).map((script) => JSON.parse(script.textContent ?? "{}"));

    expect(schemas.some((schema) => schema["@type"] === "Article")).toBe(true);
    expect(schemas.some((schema) => schema["@type"] === "FAQPage")).toBe(true);
    expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBe(true);
  });
});

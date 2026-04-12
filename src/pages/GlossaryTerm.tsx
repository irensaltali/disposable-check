import { type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotFound from "@/pages/NotFound";
import { SITE_URL } from "@/lib/seo";
import {
  glossaryTermBySlug,
  glossaryTerms,
  type GlossaryTerm as GlossaryTermType,
} from "@/content/glossaryTerms";
import { blogPostBySlug } from "@/content/blogPosts";

const renderInlineLinks = (text: string) => {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={`${match[2]}-${match.index}`}
        to={match[2]}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
};

const GlossaryTermPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? glossaryTermBySlug[slug] : undefined;

  if (!term) {
    return <NotFound />;
  }

  const termPath = `/glossary/${term.slug}`;
  const termUrl = `${SITE_URL}${termPath}`;

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: termUrl,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Email Security Glossary",
      url: `${SITE_URL}/glossary`,
    },
  };

  const faqSchema =
    term.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: term.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
            },
          })),
        }
      : null;

  const schemas = [definedTermSchema, faqSchema].filter(Boolean) as Record<string, unknown>[];

  const relatedTermObjects = term.relatedTerms
    .map((s) => glossaryTermBySlug[s])
    .filter((t): t is GlossaryTermType => Boolean(t));

  const relatedBlogPosts = term.relatedBlogSlugs
    .map((s) => blogPostBySlug[s])
    .filter(Boolean);

  return (
    <Layout>
      <SeoHead
        title={`${term.title} | DisposableCheck`}
        description={term.description}
        path={termPath}
        schema={schemas}
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Glossary</Badge>
                <Badge variant="secondary">{term.term}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {term.h1}
              </h1>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <p className="text-base leading-8 text-foreground sm:text-lg">
                  {term.definition}
                </p>
              </div>
            </header>

            <div className="mt-10 space-y-10">
              {term.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-sm leading-8 text-muted-foreground sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {term.faq.length > 0 && (
              <section className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="space-y-4">
                  {term.faq.map((item) => (
                    <Card key={item.question} className="border-border/70">
                      <CardHeader>
                        <CardTitle className="text-xl">{item.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                          {renderInlineLinks(item.answer)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Badge className="w-fit">Try It</Badge>
                  <CardTitle className="text-2xl">
                    Check any email address for free
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                    Test whether an email is from a disposable provider instantly, or integrate the check into your application with the free API.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/">Check an Email</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/docs">API Docs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {relatedTermObjects.length > 0 && (
              <section className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Related terms
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedTermObjects.map((related) => (
                    <Card key={related.slug} className="border-border/70">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <Link
                            to={`/glossary/${related.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {related.term}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-7 text-muted-foreground line-clamp-2">
                          {related.definition}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {relatedBlogPosts.length > 0 && (
              <section className="mt-12 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Related articles
                  </h2>
                  <Button asChild variant="ghost">
                    <Link to="/blog">View all posts</Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedBlogPosts.map((post) => (
                    <Card key={post.slug} className="border-border/70">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">
                          {post.primaryKeyword}
                        </Badge>
                        <CardTitle className="text-xl leading-tight">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline">
                <Link to="/glossary">Browse all glossary terms</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default GlossaryTermPage;

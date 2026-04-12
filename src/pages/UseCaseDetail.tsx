import { type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotFound from "@/pages/NotFound";
import { SITE_URL } from "@/lib/seo";
import { useCaseBySlug, type UseCase } from "@/content/useCases";
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

const UseCaseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const uc = slug ? useCaseBySlug[slug] : undefined;

  if (!uc) {
    return <NotFound />;
  }

  const ucPath = `/use-cases/${uc.slug}`;
  const ucUrl = `${SITE_URL}${ucPath}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: uc.title,
    description: uc.description,
    url: ucUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: uc.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
      },
    })),
  };

  const relatedUcs = uc.relatedUseCases
    .map((s) => useCaseBySlug[s])
    .filter((u): u is UseCase => Boolean(u));

  const relatedBlogPosts = uc.relatedBlogSlugs
    .map((s) => blogPostBySlug[s])
    .filter(Boolean);

  return (
    <Layout>
      <SeoHead
        title={`${uc.title} | DisposableCheck`}
        description={uc.description}
        path={ucPath}
        schema={[webPageSchema, faqSchema]}
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Use Case</Badge>
                <Badge variant="secondary">{uc.audience}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {uc.h1}
              </h1>
              <div className="space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
                {uc.intro.map((paragraph) => (
                  <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                ))}
              </div>
            </header>

            <section className="mt-10">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-2xl">Pain points this solves</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {uc.painPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-destructive"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <div className="mt-10 space-y-10">
              {uc.sections.map((section, index) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-sm leading-8 text-muted-foreground sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                    ))}
                  </div>

                  {index === 0 && (
                    <Card className="border-primary/20 bg-primary/5 mt-6">
                      <CardHeader>
                        <Badge className="w-fit">Get Started</Badge>
                        <CardTitle className="text-2xl">
                          Start detecting disposable emails for free
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                          Check any email instantly with the web tool, or integrate the API into your {uc.audience.toLowerCase()} workflow.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button asChild>
                            <Link to="/">Check an Email</Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link to="/get-api-key">Get Free API Key</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </section>
              ))}
            </div>

            {uc.faq.length > 0 && (
              <section className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="space-y-4">
                  {uc.faq.map((item) => (
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

            {relatedUcs.length > 0 && (
              <section className="mt-12 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Related use cases
                  </h2>
                  <Button asChild variant="ghost">
                    <Link to="/use-cases">View all</Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedUcs.map((related) => (
                    <Card key={related.slug} className="border-border/70">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">
                          {related.audience}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">
                          <Link
                            to={`/use-cases/${related.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {related.h1}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-7 text-muted-foreground line-clamp-2">
                          {related.description}
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
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default UseCaseDetailPage;

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
  comparisonBySlug,
  comparisons,
  type Comparison,
} from "@/content/comparisons";

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

const ComparisonDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const comp = slug ? comparisonBySlug[slug] : undefined;

  if (!comp) {
    return <NotFound />;
  }

  const compPath = `/compare/${comp.slug}`;
  const compUrl = `${SITE_URL}${compPath}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: comp.title,
    description: comp.description,
    url: compUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
      },
    })),
  };

  const relatedComps = comp.relatedComparisons
    .map((s) => comparisonBySlug[s])
    .filter((c): c is Comparison => Boolean(c));

  return (
    <Layout>
      <SeoHead
        title={`${comp.title} | DisposableCheck`}
        description={comp.description}
        path={compPath}
        schema={[webPageSchema, faqSchema]}
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Comparison</Badge>
                <Badge variant="secondary">vs {comp.competitor}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {comp.h1}
              </h1>
              <div className="space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
                {comp.intro.map((paragraph) => (
                  <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                ))}
              </div>
            </header>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">
                Feature comparison
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border/70">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left font-semibold">Feature</th>
                      <th className="px-4 py-3 text-left font-semibold text-primary">
                        DisposableCheck
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {comp.competitor}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.features.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                      >
                        <td className="px-4 py-3 font-medium">{row.feature}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.disposableCheck}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.competitor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="mt-10 space-y-10">
              {comp.sections.map((section) => (
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

            <section className="mt-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Badge className="w-fit">Verdict</Badge>
                  <CardTitle className="text-2xl">Our recommendation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                    {comp.verdict}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/">Try DisposableCheck Free</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/get-api-key">Get Free API Key</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {comp.faq.length > 0 && (
              <section className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="space-y-4">
                  {comp.faq.map((item) => (
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

            {relatedComps.length > 0 && (
              <section className="mt-12 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    More comparisons
                  </h2>
                  <Button asChild variant="ghost">
                    <Link to="/compare">View all</Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedComps.map((related) => (
                    <Card key={related.slug} className="border-border/70">
                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">
                          <Link
                            to={`/compare/${related.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            vs {related.competitor}
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
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ComparisonDetail;

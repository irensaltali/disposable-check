import { Fragment, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotFound from "@/pages/NotFound";
import { toAbsoluteUrl } from "@/lib/seo";
import { blogPostBySlug, blogPosts } from "@/content/blogPosts";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

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
      <Link key={`${match[2]}-${match.index}`} to={match[2]} className="font-medium text-primary underline-offset-4 hover:underline">
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

interface CtaCardProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const CtaCard = ({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaCardProps) => (
  <Card className="border-primary/20 bg-primary/5">
    <CardHeader>
      <Badge className="w-fit">{eyebrow}</Badge>
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to={primaryHref}>{primaryLabel}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={secondaryHref}>{secondaryLabel}</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostBySlug[slug] : undefined;

  if (!post) {
    return <NotFound />;
  }

  const articlePath = `/blog/${post.slug}`;
  const articleUrl = toAbsoluteUrl(articlePath);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: articleUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: [post.primaryKeyword, post.secondaryKeyword],
    image: toAbsoluteUrl("/og-image.png"),
    author: {
      "@type": "Organization",
      name: "DisposableCheck",
    },
    publisher: {
      "@type": "Organization",
      name: "DisposableCheck",
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/logo.webp"),
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
      },
    })),
  };

  const relatedPosts = post.relatedSlugs
    .map((relatedSlug) => blogPostBySlug[relatedSlug])
    .filter((relatedPost): relatedPost is (typeof blogPosts)[number] => Boolean(relatedPost));

  return (
    <Layout>
      <SeoHead
        title={`${post.title} | DisposableCheck`}
        description={post.description}
        type="article"
        path={articlePath}
        robots={post.noindex ? "noindex,follow" : "index,follow"}
        schema={[articleSchema, faqSchema]}
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{post.primaryKeyword}</Badge>
                <Badge variant="secondary">{post.secondaryKeyword}</Badge>
                <Badge variant="outline">{post.readingTime}</Badge>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.h1}</h1>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  By <span className="font-medium text-foreground">DisposableCheck</span> · Published{" "}
                  {dateFormatter.format(new Date(post.publishedAt))} · Updated{" "}
                  {dateFormatter.format(new Date(post.updatedAt))}
                </p>
              </div>
              <div className="space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
                {post.intro.map((paragraph) => (
                  <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                ))}
              </div>
            </header>

            <section className="mt-10">
              <Card className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle className="text-2xl">Key takeaways</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {post.keyTakeaways.map((takeaway) => (
                      <li key={takeaway} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <div className="mt-10 space-y-10">
              {post.sections.map((section, index) => (
                <Fragment key={section.heading}>
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.heading}</h2>
                    <div className="space-y-4 text-sm leading-8 text-muted-foreground sm:text-base">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="space-y-3 rounded-2xl border border-border/70 bg-muted/30 p-5 text-sm leading-7 text-muted-foreground sm:text-base">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {index === 1 && <CtaCard {...post.cta} />}
                </Fragment>
              ))}
            </div>

            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Frequently asked questions</h2>
              <div className="space-y-4">
                {post.faq.map((item) => (
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

            <section className="mt-12">
              <CtaCard {...post.cta} />
            </section>

            <section className="mt-12 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Related articles</h2>
                <Button asChild variant="ghost">
                  <Link to="/blog">View all posts</Link>
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug}>
                    <Card className="h-full border-border/70">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">
                          {relatedPost.primaryKeyword}
                        </Badge>
                        <CardTitle className="text-xl leading-tight">
                          <Link to={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                            {relatedPost.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-7 text-muted-foreground">{relatedPost.excerpt}</p>
                        <Button asChild variant="outline">
                          <Link to={`/blog/${relatedPost.slug}`}>Read more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

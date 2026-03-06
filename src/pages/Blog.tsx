import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/seo";
import { blogPosts } from "@/content/blogPosts";

const blogCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Disposable Email Detection Blog",
  description:
    "Guides and frameworks for checking disposable email risk, temporary inbox abuse, and disposable email API integrations.",
  url: `${SITE_URL}/blog`,
};

const blogItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: blogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/blog/${post.slug}`,
    name: post.title,
    description: post.description,
  })),
};

const Blog = () => {
  return (
    <Layout>
      <SeoHead
        title="Disposable Email Detection Blog | DisposableCheck"
        description="Browse guides on disposable email checks, temporary email detection, signup abuse prevention, and disposable email API implementation."
        path="/blog"
        schema={[blogCollectionSchema, blogItemListSchema]}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4">SEO + GEO Guides</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Disposable Email Detection Blog
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Actionable guides for fraud teams, growth operators, and developers who need cleaner signups, better
              deliverability, and real-time disposable email decisions.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link to="/">Check an Email</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/docs">Read API Docs</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.slug}>
                <Card className="h-full border-border/70 bg-card/80">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{post.primaryKeyword}</Badge>
                      <Badge variant="outline">{post.readingTime}</Badge>
                    </div>
                    <CardTitle className="mt-3 text-xl leading-tight sm:text-2xl">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">{post.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                        Secondary keyword: {post.secondaryKeyword}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                        Updated: {post.updatedAt}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-3">
                    <Button asChild>
                      <Link to={`/blog/${post.slug}`}>Read article</Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link to={post.cta.secondaryHref}>{post.cta.secondaryLabel}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

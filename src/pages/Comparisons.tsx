import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/seo";
import { comparisons } from "@/content/comparisons";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Compare Disposable Email Checkers",
  description:
    "Compare DisposableCheck with popular email verification and disposable detection tools. See feature, pricing, and focus differences.",
  url: `${SITE_URL}/compare`,
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: comparisons.map((comp, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/compare/${comp.slug}`,
    name: `DisposableCheck vs ${comp.competitor}`,
    description: comp.description,
  })),
};

const Comparisons = () => {
  return (
    <Layout>
      <SeoHead
        title="Compare Disposable Email Checkers | DisposableCheck"
        description="Compare DisposableCheck with Kickbox, ZeroBounce, NeverBounce, Abstract API, Debounce, Hunter.io, Verifalia, and Reacher. Free vs paid, features, and focus."
        path="/compare"
        schema={[collectionSchema, itemListSchema]}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4">Comparisons</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Compare Disposable Email Checkers
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              See how DisposableCheck compares to popular email verification and disposable detection tools on pricing, features, and focus.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link to="/">Try DisposableCheck Free</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/get-api-key">Get Free API Key</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {comparisons.map((comp) => (
              <article key={comp.slug}>
                <Card className="h-full border-border/70 bg-card/80 transition-colors hover:border-primary/30">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      vs {comp.competitor}
                    </Badge>
                    <CardTitle className="mt-2 text-xl leading-tight sm:text-2xl">
                      <Link
                        to={`/compare/${comp.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        DisposableCheck vs {comp.competitor}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                      {comp.description}
                    </p>
                    <Button asChild variant="outline">
                      <Link to={`/compare/${comp.slug}`}>Read comparison</Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Comparisons;

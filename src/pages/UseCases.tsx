import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/seo";
import { useCases } from "@/content/useCases";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Disposable Email Detection Use Cases",
  description:
    "How different teams use disposable email detection — SaaS, e-commerce, newsletters, lead gen, fraud prevention, and more.",
  url: `${SITE_URL}/use-cases`,
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: useCases.map((uc, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/use-cases/${uc.slug}`,
    name: uc.audience,
    description: uc.description,
  })),
};

const UseCasesPage = () => {
  return (
    <Layout>
      <SeoHead
        title="Disposable Email Detection Use Cases | DisposableCheck"
        description="See how SaaS, e-commerce, newsletter, lead gen, and fraud prevention teams use disposable email detection to protect signups and data quality."
        path="/use-cases"
        schema={[collectionSchema, itemListSchema]}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4">Use Cases</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Disposable Email Detection Use Cases
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              See how different teams use disposable email detection to protect signups, improve data quality, and prevent abuse.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link to="/">Check an Email</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/get-api-key">Get Free API Key</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {useCases.map((uc) => (
              <article key={uc.slug}>
                <Card className="h-full border-border/70 bg-card/80 transition-colors hover:border-primary/30">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {uc.audience}
                    </Badge>
                    <CardTitle className="mt-2 text-xl leading-tight sm:text-2xl">
                      <Link
                        to={`/use-cases/${uc.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {uc.h1}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                      {uc.description}
                    </p>
                    <Button asChild variant="outline">
                      <Link to={`/use-cases/${uc.slug}`}>Read more</Link>
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

export default UseCasesPage;

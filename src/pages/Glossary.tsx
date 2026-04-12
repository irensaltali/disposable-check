import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_URL } from "@/lib/seo";
import { glossaryTerms } from "@/content/glossaryTerms";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Email Security Glossary",
  description:
    "Definitions of key email security and validation terms including disposable email, MX records, SMTP verification, email deliverability, and more.",
  url: `${SITE_URL}/glossary`,
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: glossaryTerms.map((term, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/glossary/${term.slug}`,
    name: term.term,
    description: term.description,
  })),
};

const Glossary = () => {
  return (
    <Layout>
      <SeoHead
        title="Email Security Glossary | DisposableCheck"
        description="Learn key email security terms — disposable email, email verification, MX records, SMTP, deliverability, SPF, DKIM, and more. Clear definitions for developers and marketers."
        path="/glossary"
        schema={[collectionSchema, itemListSchema]}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4">Reference</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Email Security Glossary
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Clear definitions of key terms in email validation, disposable email detection, deliverability, and sender authentication.
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

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glossaryTerms.map((term) => (
              <article key={term.slug}>
                <Card className="h-full border-border/70 bg-card/80 transition-colors hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-xl leading-tight">
                      <Link
                        to={`/glossary/${term.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {term.term}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-7 text-muted-foreground line-clamp-3">
                      {term.definition}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/glossary/${term.slug}`}>Read definition</Link>
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

export default Glossary;

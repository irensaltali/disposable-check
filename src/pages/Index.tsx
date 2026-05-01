import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { EmailChecker } from "@/components/EmailChecker";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { mockStats } from "@/lib/mockData";
import { Mail, Database, Users, Code2, ArrowRight, Bot } from "lucide-react";

const API_BASE_URL = "https://disposablecheck.irensaltali.com/api";

interface Stats {
  total_emails_checked: number;
  total_disposable_domains: number;
  community_reports: number;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DisposableCheck",
  url: "https://disposablecheck.irensaltali.com/",
  logo: "https://disposablecheck.irensaltali.com/logo.webp",
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DisposableCheck",
  url: "https://disposablecheck.irensaltali.com/",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Free disposable email checker and API. Detect temporary, throwaway, and burner email addresses instantly with MX and SMTP verification.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Disposable email domain detection",
    "MX record verification",
    "SMTP connectivity check",
    "Free API with 1,000 daily requests",
    "MCP server for AI agents",
  ],
};

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a disposable email address?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A disposable email address is a temporary inbox created on a throwaway domain (e.g. mailinator.com, tempmail.com). Users create them to avoid giving out their real address, then abandon them. They are commonly used to bypass sign-up requirements, exploit free trials, and avoid spam.",
      },
    },
    {
      "@type": "Question",
      name: "How does DisposableCheck detect disposable emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DisposableCheck checks the email's domain against a continuously updated blocklist of 120,000+ known disposable domains aggregated from multiple authoritative sources. Optionally, it performs live MX record lookup and SMTP verification to confirm whether the address can actually receive mail.",
      },
    },
    {
      "@type": "Question",
      name: "Is DisposableCheck free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The web tool is completely free with no account required. The API is free up to 1,000 requests per day with a free API key. No credit card is needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is deep email verification (MX & SMTP check)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deep verification goes beyond domain list matching. It queries DNS for the domain's MX records to verify the domain accepts email, then performs an SMTP handshake to confirm the specific mailbox exists and is not a catch-all. This adds 1–3 seconds of latency but catches disposable addresses that use legitimate infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use DisposableCheck in my application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DisposableCheck provides a REST API (GET /api/v1/check) and an MCP server endpoint for AI agents. Get a free API key at disposablecheck.irensaltali.com/get-api-key. The API supports JavaScript, Python, cURL, and any HTTP client.",
      },
    },
  ],
};

const Index = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let count = 0;
    const maxCount = 3;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/stats`);
        if (response.ok && isMounted) {
          const data = await response.json();
          setStats(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) console.error("Failed to fetch stats:", error);
      }
    };

    // Initial fetch
    fetchStats();

    // Start polling
    intervalId = setInterval(() => {
      if (count < maxCount) {
        fetchStats();
        count++;
      } else {
        if (intervalId) clearInterval(intervalId);
      }
    }, 30000);

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshKey]);

  const handleEmailChecked = useCallback(() => {
    // Force a refresh of the stats when an email is manually checked
    setRefreshKey((prev) => prev + 1);
  }, []);

  // Use API stats if available, otherwise fall back to mock data
  const displayStats = stats
    ? {
      totalEmailsChecked: stats.total_emails_checked,
      totalDisposableDomains: stats.total_disposable_domains,
      recentContributions: stats.community_reports,
    }
    : mockStats;

  return (
    <Layout>
      <SeoHead
        title="Disposable Email Checker — Free Tool & API | DisposableCheck"
        description="Free disposable email checker. Detect temporary, throwaway, and burner email addresses instantly with MX and SMTP verification. Free API with 1,000 daily requests."
        schema={[organizationSchema, softwareAppSchema, homepageFaqSchema]}
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
              New: Deep Verification
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Free Disposable Email Checker
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Detect temporary, throwaway, and burner email addresses instantly. Verify MX records and SMTP connectivity. Free to use, with a public API for developers.
            </p>
          </div>

          <EmailChecker onEmailChecked={handleEmailChecked} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-14 lg:mt-16 max-w-4xl mx-auto">
            <StatsCard
              icon={Mail}
              value={displayStats.totalEmailsChecked}
              label="Emails Checked"
              loading={loading}
              animate={true}
            />
            <StatsCard
              icon={Database}
              value={displayStats.totalDisposableDomains}
              label="Disposable Domains"
              loading={loading}
            />
            <StatsCard
              icon={Users}
              value={displayStats.recentContributions}
              label="Community Reports"
              loading={loading}
              className="sm:col-span-2 lg:col-span-1"
            />

          </div>

          <section
            aria-labelledby="developer-cta-heading"
            className="mt-16 sm:mt-20 max-w-4xl mx-auto rounded-2xl border bg-card p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 space-y-4">
                <h2 id="developer-cta-heading" className="text-xl sm:text-2xl font-semibold">
                  Need this in your app or AI agent?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Block disposable signups before they hit your database, or let an MCP-compatible agent check emails directly. 1,000 free API requests/day, no credit card.
                </p>
                <div className="grid gap-3 lg:grid-cols-2">
                  <div className="rounded-lg border bg-muted/40 p-3 sm:p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                      HTTP API
                    </div>
                    <pre className="overflow-x-auto text-xs font-mono">
{`curl 'https://disposablecheck.irensaltali.com/api/v1/check?email=user@tempmail.com' \\
  -H 'X-API-Key: YOUR_KEY'`}
                    </pre>
                  </div>
                  <div className="rounded-lg border bg-muted/40 p-3 sm:p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                      MCP HTTP
                    </div>
                    <pre className="overflow-x-auto text-xs font-mono">
{`https://disposablecheck.irensaltali.com/mcp
X-API-Key: YOUR_KEY`}
                    </pre>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/get-api-key">
                      Get free API key <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/docs">Read the docs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="faq-heading" className="mt-16 sm:mt-20 max-w-4xl mx-auto">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {homepageFaqSchema.mainEntity.map((item) => (
                <div key={item.name} className="rounded-xl border bg-card p-4 sm:p-6">
                  <h3 className="font-semibold text-sm sm:text-base mb-2">{item.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-7">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center mt-12 mb-8">
            <a href="https://www.buymeacoffee.com/irensaltali" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                className="h-[50px] w-auto sm:h-[60px]"
                loading="lazy"
                width="217"
                height="60"
              />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

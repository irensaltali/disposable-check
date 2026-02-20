import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { EmailChecker } from "@/components/EmailChecker";
import { StatsCard } from "@/components/StatsCard";
import { mockStats } from "@/lib/mockData";
import { Mail, Database, Users } from "lucide-react";

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
  url: "https://disposablecheck.com",
  logo: "https://disposablecheck.com/logo.png",
};

const Index = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let count = 0;
    const maxCount = 120;
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
    }, 5000);

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
        title="Check Disposable Email Address Instantly | DisposableCheck"
        description="Instantly check if an email address is disposable, temporary, or unreachable. Free disposable email detector with deep MX and SMTP verification."
        schema={organizationSchema}
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto container-responsive">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
              New: Deep Verification
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Check Disposable Email Address Instantly
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly check if an email address is from a disposable provider, verify MX records, and check SMTP connectivity. Free to use, with a public API.
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

          <div className="flex justify-center mt-12 mb-8">
            <a href="https://www.buymeacoffee.com/irensaltali" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                className="h-[50px] w-auto sm:h-[60px]"
              />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

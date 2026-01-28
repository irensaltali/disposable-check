import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
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

  const handleEmailChecked = () => {
    // Force a refresh of the stats when an email is manually checked
    // This resets the polling loop too, which is acceptable or even desired behavior (resetting the 120 limit)
    setRefreshKey(prev => prev + 1);
  };

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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Disposable Email Detector
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly check if an email address is from a disposable or temporary email provider. Free to use, with a public API.
            </p>

            <div className="flex justify-center mt-8">
              <a
                href="https://www.producthunt.com/products/disposablecheck-disposable-email-check?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-disposablecheck-disposable-email-check"
                target="_blank"
                rel="noopener noreferrer"
                className="block dark:hidden"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1068935&theme=light&t=1769528281886"
                  alt="DisposableCheck – Disposable Email Check - Free Disposable Email Detector & API | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250"
                  height="54"
                />
              </a>
              <a
                href="https://www.producthunt.com/products/disposablecheck-disposable-email-check?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-disposablecheck-disposable-email-check"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden dark:block"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1068935&theme=dark&t=1769528358371"
                  alt="DisposableCheck – Disposable Email Check - Free Disposable Email Detector & API | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250"
                  height="54"
                />
              </a>
            </div>
          </div>

          <EmailChecker onEmailChecked={handleEmailChecked} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
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
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

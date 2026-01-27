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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Disposable Email Detector
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly check if an email address is from a disposable or temporary email provider. Free to use, with a public API.
            </p>
          </div>

          <EmailChecker />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto">
            <StatsCard
              icon={Mail}
              value={displayStats.totalEmailsChecked}
              label="Emails Checked"
              loading={loading}
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

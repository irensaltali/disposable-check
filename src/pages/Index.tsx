import { Layout } from "@/components/Layout";
import { EmailChecker } from "@/components/EmailChecker";
import { StatsCard } from "@/components/StatsCard";
import { mockStats } from "@/lib/mockData";
import { Mail, Database, Users } from "lucide-react";

const Index = () => {
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
              value={mockStats.totalEmailsChecked}
              label="Emails Checked"
            />
            <StatsCard
              icon={Database}
              value={mockStats.totalDisposableDomains}
              label="Disposable Domains"
            />
            <StatsCard
              icon={Users}
              value={mockStats.recentContributions}
              label="Community Reports"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { DISPOSABLE_DOMAINS } from "@/lib/mockData";

const ReportDomain = () => {
  const [domain, setDomain] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanDomain = domain.toLowerCase().trim();

    if (!cleanDomain || !cleanDomain.includes(".")) {
      setError("Please enter a valid domain (e.g., tempmail.com)");
      return;
    }

    if (DISPOSABLE_DOMAINS.includes(cleanDomain)) {
      setError("This domain is already in our database.");
      return;
    }

    // Mock submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-lg">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-fit">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-muted-foreground mb-4">
                    Your domain report has been submitted for review. Our team will verify it and add it to the database if confirmed.
                  </p>
                  <Button onClick={() => { setSubmitted(false); setDomain(""); setReason(""); }}>
                    Report Another Domain
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Report a Disposable Domain</h1>
            <p className="text-muted-foreground">
              Help improve our database by reporting disposable email domains you've encountered.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit Domain</CardTitle>
              <CardDescription>
                All submissions are reviewed before being added to our database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="e.g., tempmail.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Why is this disposable? (optional)</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    placeholder="Provide any context about why this domain should be flagged…"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ReportDomain;

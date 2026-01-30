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

const API_BASE_URL = "https://disposablecheck.irensaltali.com/api";

const ReportDomain = () => {
  const [domain, setDomain] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: cleanDomain,
          reason: reason.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to report domain. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-spacing">
          <div className="container mx-auto container-responsive max-w-lg">
            <Card>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="text-center">
                  <div className="mx-auto mb-3 sm:mb-4 rounded-full bg-success p-2.5 sm:p-3 w-fit">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success-foreground" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-muted-foreground mb-4 sm:mb-5 text-sm sm:text-base">
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
      <section className="section-spacing">
        <div className="container mx-auto container-responsive max-w-lg">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Report a Disposable Domain</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Help improve our database by reporting disposable email domains you&apos;ve encountered.
            </p>
          </div>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Submit Domain</CardTitle>
              <CardDescription className="text-sm">
                All submissions are reviewed before being added to our database.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-sm">Domain Name</Label>
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="e.g., tempmail.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                    disabled={loading}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-sm">Why is this disposable? (optional)</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    placeholder="Provide any context about why this domain should be flagged…"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    disabled={loading}
                    className="text-sm"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-sm">Error</AlertTitle>
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Report"}
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

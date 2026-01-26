import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttributionPopup } from "@/components/AttributionPopup";
import { CheckCircle, Key, Copy, Check, Info } from "lucide-react";

const GetApiKey = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock API key
  const mockApiKey = "dk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-lg">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-fit">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Your API Key is Ready!</h2>
                  <p className="text-muted-foreground">
                    Keep this key safe. You can use it to make API requests.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        value={mockApiKey}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon" onClick={copyToClipboard}>
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                    <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                      <span className="text-lg">⚠️</span> Attribution Required
                      <AttributionPopup
                        trigger={
                          <button className="text-xs bg-amber-200 dark:bg-amber-800 px-2 py-0.5 rounded-full hover:bg-amber-300 dark:hover:bg-amber-700 transition-colors">
                            <Info className="h-3 w-3 inline mr-1" />Details
                          </button>
                        }
                      />
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                      Free tier usage requires a visible backlink to one of the following sites on your application:
                    </p>
                    <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-200">
                      <li>• <a href="https://irensaltali.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">irensaltali.com</a></li>
                      <li>• <a href="https://sendfax.pro" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">sendfax.pro</a></li>
                      <li>• <a href="https://zenrise.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">zenrise.app</a></li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Quick Start</h4>
                    <pre className="text-sm overflow-x-auto">
                      {`curl -X GET \\
  'https://api.disposablecheck.com/v1/check?email=test@tempmail.com' \\
  -H 'X-API-Key: ${mockApiKey}'`}
                    </pre>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Free tier: 1,000 requests/day (attribution required)</p>
                  </div>
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
            <h1 className="text-3xl font-bold mb-2">Get Your Free API Key</h1>
            <p className="text-muted-foreground">
              Start detecting disposable emails in your application today.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Request API Key
              </CardTitle>
              <CardDescription>
                Enter your email to receive your free API key instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Get Free API Key
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-4 text-center">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Free Forever</h3>
              <p className="text-sm text-muted-foreground">1,000 API calls/day with attribution</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Simple Attribution</h3>
              <p className="text-sm text-muted-foreground">Just add a backlink to get started</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetApiKey;

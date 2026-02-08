import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AttributionPopup } from "@/components/AttributionPopup";
import { Info } from "lucide-react";

const ApiDocs = () => {
  return (
    <Layout>
      <section className="section-spacing">
        <div className="container mx-auto container-responsive max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">API Documentation</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Integrate disposable email detection into your application with our free API.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Badge variant="secondary" className="text-xs sm:text-sm">GET</Badge>
                  Check Email
                </CardTitle>
                <CardDescription className="text-sm">
                  Check if an email address is from a disposable email provider.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Endpoint</h4>
                  <code className="code-block text-xs">
                    GET https://disposablecheck.irensaltali.com/api/v1/check?email={"{email}"}&check_reachable=true
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Query Parameters</h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-mono text-xs bg-muted px-1 rounded">check_reachable</span> (optional, boolean): Set to true to enable deep verification (MX & SMTP). Defaults to false.
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Headers</h4>
                  <code className="code-block text-xs">
                    X-API-Key: your_api_key_here
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Response</h4>
                  <pre className="code-block text-xs">
                    {`{
  "email": "user@tempmail.com",
  "domain": "tempmail.com",
  "is_disposable": true,
  "is_valid_format": true,
  "checked_at": "2026-01-15T10:30:00Z",
  "reacher": {
    "is_reachable": "safe",
    "mx": { "accepts_mail": true, "records": [...] },
    "smtp": { "can_connect_smtp": true, "has_full_inbox": false, ... }
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Code Examples</CardTitle>
                <CardDescription className="text-sm">
                  Quick start examples in popular languages.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <Tabs defaultValue="javascript">
                  <TabsList className="w-full sm:w-auto flex-wrap h-auto">
                    <TabsTrigger value="javascript" className="text-xs sm:text-sm">JavaScript</TabsTrigger>
                    <TabsTrigger value="python" className="text-xs sm:text-sm">Python</TabsTrigger>
                    <TabsTrigger value="curl" className="text-xs sm:text-sm">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript" className="mt-4">
                    <pre className="code-block text-xs">
                      {`const response = await fetch(
  'https://disposablecheck.irensaltali.com/api/v1/check?email=user@example.com&check_reachable=true',
  {
    headers: {
      'X-API-Key': 'your_api_key_here'
    }
  }
);

const data = await response.json();
console.log(data);`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="mt-4">
                    <pre className="code-block text-xs">
                      {`import requests

response = requests.get(
    'https://disposablecheck.irensaltali.com/api/v1/check',
    params={'email': 'user@example.com', 'check_reachable': 'true'},
    headers={'X-API-Key': 'your_api_key_here'}
)

data = response.json()
print(data)  # Full response`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="curl" className="mt-4">
                    <pre className="code-block text-xs">
                      {`curl -X GET \\
  'https://disposablecheck.irensaltali.com/api/v1/check?email=user@example.com&check_reachable=true' \\
  -H 'X-API-Key: your_api_key_here'`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Rate Limits</CardTitle>
                <CardDescription className="text-sm">
                  API usage limits per tier.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="border rounded-lg p-4 bg-amber-accent border-amber-accent">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      Free Tier
                      <AttributionPopup
                        trigger={
                          <button className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full hover:bg-primary/30 transition-colors inline-flex items-center gap-1">
                            <Info className="h-3 w-3" />View Requirements
                          </button>
                        }
                      />
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1,000 requests per day</li>
                      <li>• Single email checks</li>
                      <li>• Email support</li>
                      <li>• <span className="text-primary font-medium">Attribution required</span> (backlink)</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4 bg-card">
                    <h4 className="font-semibold mb-2 text-sm">Pro Tier</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 100,000 requests per day</li>
                      <li>• Bulk email checks</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ApiDocs;

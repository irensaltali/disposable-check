import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AttributionPopup } from "@/components/AttributionPopup";
import { Info } from "lucide-react";

const ApiDocs = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
            <p className="text-muted-foreground">
              Integrate disposable email detection into your application with our free API.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">GET</Badge>
                  Check Email
                </CardTitle>
                <CardDescription>
                  Check if an email address is from a disposable email provider.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Endpoint</h4>
                  <code className="block bg-muted p-3 rounded-md text-sm">
                    GET https://disposablecheck.irensaltali.com/api/v1/check?email={"{email}"}
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Headers</h4>
                  <code className="block bg-muted p-3 rounded-md text-sm">
                    X-API-Key: your_api_key_here
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                    {`{
  "email": "user@tempmail.com",
  "domain": "tempmail.com",
  "is_disposable": true,
  "is_valid_format": true,
  "checked_at": "2026-01-15T10:30:00Z"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>
                  Quick start examples in popular languages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="javascript" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`const response = await fetch(
  'https://disposablecheck.irensaltali.com/api/v1/check?email=user@example.com',
  {
    headers: {
      'X-API-Key': 'your_api_key_here'
    }
  }
);

const data = await response.json();
console.log(data.is_disposable); // true or false`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`import requests

response = requests.get(
    'https://disposablecheck.irensaltali.com/api/v1/check',
    params={'email': 'user@example.com'},
    headers={'X-API-Key': 'your_api_key_here'}
)

data = response.json()
print(data['is_disposable'])  # True or False`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="curl" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`curl -X GET \\
  'https://disposablecheck.irensaltali.com/api/v1/check?email=user@example.com' \\
  -H 'X-API-Key: your_api_key_here'`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
                <CardDescription>
                  API usage limits per tier.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      Free Tier
                      <AttributionPopup
                        trigger={
                          <button className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full hover:bg-amber-300 dark:hover:bg-amber-700 transition-colors inline-flex items-center gap-1">
                            <Info className="h-3 w-3" />View Requirements
                          </button>
                        }
                      />
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1,000 requests per day</li>
                      <li>• Single email checks</li>
                      <li>• Email support</li>
                      <li>• <span className="text-amber-600 dark:text-amber-400 font-medium">Attribution required</span> (backlink)</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Pro Tier</h4>
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

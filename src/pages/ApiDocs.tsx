import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AttributionPopup } from "@/components/AttributionPopup";
import { Info, Bot } from "lucide-react";

const ApiDocs = () => {
  return (
    <Layout>
      <SeoHead
        title="Disposable Email Verification API Documentation | DisposableCheck"
        description="Read API docs for disposable email detection, deep verification, authentication, and language examples."
      />
      <section className="section-spacing">
        <div className="container mx-auto container-responsive max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Disposable Email Verification API Documentation</h1>
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
                  <pre className="code-block text-xs whitespace-pre-wrap break-all">
                    GET https://disposablecheck.irensaltali.com/api/v1/check?email={"{email}"}&check_reachable=true
                  </pre>
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
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Bot className="h-4 w-4" />
                  MCP Server (Claude / AI Clients)
                </CardTitle>
                <CardDescription className="text-sm">
                  Use DisposableCheck directly inside Claude Code, Claude Desktop, or Cursor — no HTTP calls needed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <Tabs defaultValue="claude-code">
                  <TabsList className="w-full sm:w-auto flex-wrap h-auto">
                    <TabsTrigger value="hosted" className="text-xs sm:text-sm">Hosted HTTPS</TabsTrigger>
                    <TabsTrigger value="claude-code" className="text-xs sm:text-sm">Claude Code</TabsTrigger>
                    <TabsTrigger value="claude-desktop" className="text-xs sm:text-sm">Claude Desktop</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hosted" className="mt-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Use the hosted Streamable HTTP endpoint with an API key header:</p>
                    <pre className="code-block text-xs whitespace-pre-wrap break-all">{`https://disposablecheck.irensaltali.com/mcp

Authorization: Bearer dk_live_YOUR_KEY
# or
X-API-Key: dk_live_YOUR_KEY`}</pre>
                  </TabsContent>
                  <TabsContent value="claude-code" className="mt-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Run this once in your terminal (replace with your API key):</p>
                    <pre className="code-block text-xs whitespace-pre-wrap break-all">{`claude mcp add disposable-check \\
  -e DISPOSABLE_CHECK_API_KEY=dk_live_YOUR_KEY \\
  -- npx -y disposable-check-mcp`}</pre>
                    <p className="text-sm text-muted-foreground">Then ask Claude naturally:</p>
                    <div className="space-y-2">
                      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm font-mono">"Is user@mailinator.com a disposable email?"</div>
                      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm font-mono">"Check test@gmail.com with deep MX/SMTP verification."</div>
                      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm font-mono">"Show my API quota for iren.para@gmail.com"</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="claude-desktop" className="mt-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Add to <code className="text-xs bg-muted px-1 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>:</p>
                    <pre className="code-block text-xs">{`{
  "mcpServers": {
    "disposable-check": {
      "command": "npx",
      "args": ["-y", "disposable-check-mcp"],
      "env": {
        "DISPOSABLE_CHECK_API_KEY": "dk_live_YOUR_KEY"
      }
    }
  }
}`}</pre>
                    <p className="text-sm text-muted-foreground">Restart Claude Desktop and the tools will be available automatically.</p>
                  </TabsContent>
                </Tabs>

                <div>
                  <h4 className="font-medium mb-3 text-sm">Available Tools</h4>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">check_email</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Check if an email is disposable. Pass <code className="bg-muted px-1 rounded">check_reachable: true</code> for live MX + SMTP deep verification.</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">get_key_info</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">View daily limit, requests used today, and remaining quota for your API key.</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">get_stats</Badge>
                        <Badge variant="outline" className="text-xs font-mono">report_domain</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Read platform stats or submit a disposable-domain community report for review.</p>
                    </div>
                  </div>
                </div>
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
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm flex-wrap">
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

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { checkEmailDisposable, isValidEmail } from "@/lib/mockData";
import { Upload, Download, CheckCircle, XCircle, Loader2, Lock, Sparkles } from "lucide-react";

interface EmailResult {
  email: string;
  isValid: boolean;
  isDisposable: boolean;
  domain: string;
}

const BulkCheck = () => {
  const [emailInput, setEmailInput] = useState("");
  const [results, setResults] = useState<EmailResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Feature flag for Pro requirement
  const isProFeature = true;

  const processEmails = () => {
    if (isProFeature) return;

    setIsProcessing(true);

    setTimeout(() => {
      const emails = emailInput
        .split(/[\n,;]/)
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      const processed = emails.map((email) => {
        const valid = isValidEmail(email);
        const { isDisposable, domain } = checkEmailDisposable(email);
        return {
          email,
          isValid: valid,
          isDisposable: valid ? isDisposable : false,
          domain,
        };
      });

      setResults(processed);
      setIsProcessing(false);
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProFeature) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setEmailInput(text);
    };
    reader.readAsText(file);
  };

  const exportResults = () => {
    const csv = [
      "Email,Valid,Disposable,Domain",
      ...results.map(
        (r) => `${r.email},${r.isValid},${r.isDisposable},${r.domain}`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-check-results.csv";
    a.click();
  };

  const validCount = results.filter((r) => r.isValid && !r.isDisposable).length;
  const disposableCount = results.filter((r) => r.isDisposable).length;
  const invalidCount = results.filter((r) => !r.isValid).length;

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold">Bulk Email Check</h1>
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Check multiple email addresses at once. Paste emails or upload a CSV file.
            </p>
          </div>

          {/* Pro Feature Overlay Card */}
          {isProFeature && (
            <Card className="mb-6 border-2 border-dashed border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-4 w-fit shadow-lg shadow-amber-500/25">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                    Bulk Check is a Pro Feature
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Coming soon! Upgrade to Pro to check thousands of emails at once with CSV upload, export, and detailed analytics.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button disabled className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Coming Soon
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:hello@disposablecheck.com?subject=Interested in Bulk Check Pro">
                        Notify Me
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Original form - shown but disabled when Pro feature */}
          <Card className={`mb-6 ${isProFeature ? 'opacity-50 pointer-events-none' : ''}`}>
            <CardHeader>
              <CardTitle>Enter Emails</CardTitle>
              <CardDescription>
                Paste email addresses separated by new lines, commas, or semicolons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="email1@example.com&#10;email2@tempmail.com&#10;email3@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                rows={6}
                disabled={isProFeature}
              />
              <div className="flex flex-wrap gap-3">
                <Button onClick={processEmails} disabled={!emailInput || isProcessing || isProFeature}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Check Emails"
                  )}
                </Button>
                <Button variant="outline" asChild disabled={isProFeature}>
                  <label className={`cursor-pointer ${isProFeature ? 'cursor-not-allowed' : ''}`}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload CSV
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isProFeature}
                    />
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {results.length > 0 && !isProFeature && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>
                    {validCount} valid, {disposableCount} disposable, {invalidCount} invalid
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-sm">
                            {result.email}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {result.domain || "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            {!result.isValid ? (
                              <Badge variant="outline">Invalid</Badge>
                            ) : result.isDisposable ? (
                              <Badge variant="destructive" className="gap-1">
                                <XCircle className="h-3 w-3" />
                                Disposable
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle className="h-3 w-3" />
                                Valid
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BulkCheck;

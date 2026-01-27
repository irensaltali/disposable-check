import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttributionPopup } from "@/components/AttributionPopup";
import { CheckCircle, Key, Info, Loader2 } from "lucide-react";

const TURNSTILE_SITE_KEY = "0x4AAAAAACTbZs1Gmq6N2iTM";
const API_BASE_URL = "https://disposablecheck.irensaltali.com/api";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const GetApiKey = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load Turnstile script
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Render Turnstile widget
  useEffect(() => {
    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
          setError(null);
        },
        "error-callback": () => {
          setError("Turnstile verification failed. Please try again.");
          setTurnstileToken(null);
        },
        "expired-callback": () => {
          setTurnstileToken(null);
        },
        theme: "auto",
      });
    };

    // Check if turnstile is ready, otherwise wait
    const checkAndRender = () => {
      if (window.turnstile) {
        renderWidget();
      } else {
        setTimeout(checkAndRender, 100);
      }
    };

    checkAndRender();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken(null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the verification challenge.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/keys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create API key. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      resetTurnstile();
    } finally {
      setLoading(false);
    }
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
                  <h2 className="text-xl font-semibold mb-2">Check Your Email!</h2>
                  <p className="text-muted-foreground">
                    We've sent your API key to <strong>{email}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    If you don't see it, check your spam folder.
                  </p>
                </div>

                <div className="space-y-4">
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
                    disabled={loading}
                  />
                </div>

                {/* Turnstile Widget */}
                <div ref={turnstileRef} className="flex justify-center" />

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={loading || !turnstileToken}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get Free API Key"
                  )}
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

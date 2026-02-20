import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
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
        <SeoHead
          title="Get Free Disposable Email API Key | DisposableCheck"
          description="Create your free DisposableCheck API key and start detecting disposable emails with 1,000 daily requests."
        />
        <section className="section-spacing">
          <div className="container mx-auto container-responsive max-w-lg">
            <Card>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="text-center mb-5 sm:mb-6">
                  <div className="mx-auto mb-3 sm:mb-4 rounded-full bg-success p-2.5 sm:p-3 w-fit">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success-foreground" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-semibold mb-2">Your Free API Key Is on the Way</h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    We&apos;ve sent your API key to <strong>{email}</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    If you don&apos;t see it, check your spam folder.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-3 sm:p-4 bg-amber-accent border-amber-accent">
                    <h4 className="font-medium mb-2 text-foreground flex items-center gap-2 text-sm">
                      <span className="text-base sm:text-lg">⚠️</span> Attribution Required
                      <AttributionPopup
                        trigger={
                          <button className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full hover:bg-primary/30 transition-colors">
                            <Info className="h-3 w-3 inline mr-1" />Details
                          </button>
                        }
                      />
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      Free tier usage requires a visible backlink to one of the following sites on your application:
                    </p>
                    <ul className="text-xs sm:text-sm space-y-1 text-foreground">
                      <li>• <a href="https://irensaltali.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">irensaltali.com</a></li>
                      <li>• <a href="https://sendfax.pro" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">sendfax.pro</a></li>
                      <li>• <a href="https://zenrise.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">zenrise.app</a></li>
                    </ul>
                  </div>

                  <div className="text-center text-xs sm:text-sm text-muted-foreground">
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
      <SeoHead
        title="Get Free Disposable Email API Key | DisposableCheck"
        description="Create your free DisposableCheck API key and start detecting disposable emails with 1,000 daily requests."
      />
      <section className="section-spacing">
        <div className="container mx-auto container-responsive max-w-lg">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Get Free Disposable Email API Key</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Start detecting disposable emails in your application today.
            </p>
          </div>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Key className="h-5 w-5" />
                Request API Key
              </CardTitle>
              <CardDescription className="text-sm">
                Enter your email to receive your free API key instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="text-sm"
                  />
                </div>

                {/* Turnstile Widget */}
                <div ref={turnstileRef} className="flex justify-center" />

                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={loading || !turnstileToken}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
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

          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 text-center grid-cols-1 sm:grid-cols-2">
            <div className="border rounded-lg p-3 sm:p-4 bg-card">
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Free Forever</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">1,000 API calls/day with attribution</p>
            </div>
            <div className="border rounded-lg p-3 sm:p-4 bg-card">
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Simple Attribution</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Just add a backlink to get started</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetApiKey;

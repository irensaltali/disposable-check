import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Mail, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { isValidEmail } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EmailCheckerProps {
  onEmailChecked?: () => void;
}

interface ReacherResult {
  is_reachable: string;
  mx: { accepts_mail: boolean };
  smtp: { can_connect_smtp: boolean; has_full_inbox: boolean; is_catch_all: boolean };
}

export function EmailChecker({ onEmailChecked }: EmailCheckerProps) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{
    isDisposable: boolean;
    domain: string;
    reacher?: ReacherResult;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [deepCheck, setDeepCheck] = useState(false);

  useEffect(() => {
    const valid = isValidEmail(email);
    setIsValid(valid);

    if (!valid) {
      setResult(null);
      return;
    }

    // Debounce the API call
    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const url = deepCheck
          ? `https://disposablecheck.irensaltali.com/api/v1/check?email=${encodeURIComponent(email)}&check_reachable=true`
          : `https://disposablecheck.irensaltali.com/api/v1/check?email=${encodeURIComponent(email)}`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setResult({
            isDisposable: data.is_disposable,
            domain: data.domain,
            reacher: data.reacher,
          });
          // Trigger the callback to refresh stats
          onEmailChecked?.();
        } else {
          console.error("API Error", response.status);
          setResult(null);
        }
      } catch (error) {
        console.error("Failed to check email:", error);
        setResult(null);
      } finally {
        setIsChecking(false);
      }
    }, 500); // Increased debounce to 500ms to reduce API calls while typing

    return () => clearTimeout(timer);
  }, [email, deepCheck, onEmailChecked]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <div className="relative">
        <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter email address to check…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg"
        />
        {isChecking && (
          <Loader2 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="flex items-center space-x-2 mt-4 px-1">
        <Switch id="deep-check" checked={deepCheck} onCheckedChange={setDeepCheck} />
        <Label htmlFor="deep-check" className="flex items-center cursor-pointer">
          <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
          <span>Enable Deep Verification (MX & SMTP)</span>
          <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Slower</span>
        </Label>
      </div>

      {email && isValid && result && !isChecking && (
        <Card
          className={cn(
            "mt-3 sm:mt-4 transition-all overflow-hidden",
            result.isDisposable
              ? "border-destructive bg-destructive/5"
              : "border-success bg-success/5"
          )}
        >
          <CardContent className="p-0">
            <div className="flex items-start sm:items-center gap-3 p-3 sm:p-4 border-b border-border/50 last:border-0">
              {result.isDisposable ? (
                <>
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-destructive text-sm sm:text-base">Disposable Email Detected</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      The domain <span className="font-mono break-all">{result.domain}</span> is a known disposable email provider.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-success shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-success text-sm sm:text-base">Valid Email Domain</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      The domain <span className="font-mono break-all">{result.domain}</span> appears to be a legitimate email provider.
                    </p>
                  </div>
                </>
              )}
            </div>

            {result.reacher && (
              <div className="bg-background/50 p-3 sm:p-4 grid gap-2 text-sm border-t border-border/10">
                <div className="flex items-center gap-2 font-medium mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  Deep Verification Results
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MX Records:</span>
                    <span className={result.reacher.mx.accepts_mail ? "text-success font-medium" : "text-destructive font-medium"}>
                      {result.reacher.mx.accepts_mail ? "Valid" : "Invalid"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SMTP Connect:</span>
                    <span className={result.reacher.smtp.can_connect_smtp ? "text-success font-medium" : "text-destructive font-medium"}>
                      {result.reacher.smtp.can_connect_smtp ? "Success" : "Failed"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Inbox:</span>
                    <span className={result.reacher.smtp.has_full_inbox ? "text-destructive font-medium" : "text-success font-medium"}>
                      {result.reacher.smtp.has_full_inbox ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catch-all:</span>
                    <span className="font-medium">
                      {result.reacher.smtp.is_catch_all ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {email && !isValid && (
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Please enter a valid email address</p>
      )}
    </div>
  );
}

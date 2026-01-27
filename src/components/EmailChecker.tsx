import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react";
import { checkEmailDisposable, isValidEmail } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function EmailChecker() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{
    isDisposable: boolean;
    domain: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = isValidEmail(email);
    setIsValid(valid);

    if (!valid) {
      setResult(null);
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(() => {
      const checkResult = checkEmailDisposable(email);
      setResult(checkResult);
      setIsChecking(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [email]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter email address to check…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-12 h-14 text-lg"
        />
        {isChecking && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
        )}
      </div>

      {email && isValid && result && !isChecking && (
        <Card
          className={cn(
            "mt-4 transition-all",
            result.isDisposable
              ? "border-destructive bg-destructive/5"
              : "border-green-500 bg-green-50 dark:bg-green-950/20"
          )}
        >
          <CardContent className="flex items-center gap-3 p-4">
            {result.isDisposable ? (
              <>
                <XCircle className="h-6 w-6 text-destructive shrink-0" />
                <div>
                  <p className="font-medium text-destructive">Disposable Email Detected</p>
                  <p className="text-sm text-muted-foreground">
                    The domain <span className="font-mono">{result.domain}</span> is a known disposable email provider.
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500 shrink-0" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">Valid Email Domain</p>
                  <p className="text-sm text-muted-foreground">
                    The domain <span className="font-mono">{result.domain}</span> appears to be a legitimate email provider.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {email && !isValid && (
        <p className="mt-2 text-sm text-muted-foreground">Please enter a valid email address</p>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  loading?: boolean;
  animate?: boolean;
  className?: string;
}

export function StatsCard({ icon: Icon, value, label, loading, animate, className }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!animate || typeof value !== "number") {
      setDisplayValue(value);
      return;
    }

    // Only animate if value increased
    const start = typeof displayValue === "number" ? displayValue : 0;
    const end = value;
    if (start >= end) {
      setDisplayValue(end);
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = Math.floor(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value, animate, displayValue]);

  const formattedValue =
    typeof displayValue === "number" ? displayValue.toLocaleString() : displayValue;

  return (
    <Card className={cn("card-hover", className)}>
      <CardContent className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
        <div className="rounded-full bg-primary/10 p-2.5 sm:p-3 shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="h-7 sm:h-8 w-20 sm:w-24 bg-muted animate-pulse rounded" />
          ) : (
            <p className="text-xl sm:text-2xl font-bold truncate">{formattedValue}</p>
          )}
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  loading?: boolean;
  animate?: boolean;
}

export function StatsCard({ icon: Icon, value, label, loading, animate }: StatsCardProps) {
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
  }, [value, animate]);

  const formattedValue =
    typeof displayValue === "number" ? displayValue.toLocaleString() : displayValue;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          {loading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          ) : (
            <p className="text-2xl font-bold">{formattedValue}</p>
          )}
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

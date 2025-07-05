"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { getDailyFact } from "@/ai/flows/get-daily-fact";

export default function DailyFact() {
  const [fact, setFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFact = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const today = new Date().toISOString().split('T')[0];
        const storedFact = localStorage.getItem('dailyFact');
        const storedDate = localStorage.getItem('dailyFactDate');

        if (storedFact && storedDate === today) {
          setFact(storedFact);
        } else {
          const result = await getDailyFact();
          setFact(result.fact);
          localStorage.setItem('dailyFact', result.fact);
          localStorage.setItem('dailyFactDate', today);
        }
      } catch (e) {
        console.error("Failed to fetch daily fact:", e);
        setError("Could not load a fun fact today. Please check back tomorrow!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFact();
  }, []);

  if (isLoading) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Lightbulb className="h-5 w-5 text-accent" />
                <CardTitle className="font-headline text-lg">Daily Eco-Fact</CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardContent>
        </Card>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
     )
  }

  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Lightbulb className="h-5 w-5 text-accent" />
        <CardTitle className="font-headline text-lg text-accent">Daily Eco-Fact</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-accent-foreground/90">{fact}</p>
      </CardContent>
    </Card>
  );
}

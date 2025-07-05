"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/hooks/use-app";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  estimateCarbonFootprint,
  EstimateCarbonFootprintOutput,
} from "@/ai/flows/estimate-carbon-footprint";
import {
  suggestLowerCarbonOptions,
  SuggestLowerCarbonOptionsOutput,
} from "@/ai/flows/suggest-lower-carbon-options";
import { ArrowRight, Sparkles, X, Leaf, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TransactionDetails() {
  const {
    selectedTransaction,
    setSelectedTransaction,
    setUserPoints,
  } = useApp();
  const { toast } = useToast();
  const [footprint, setFootprint] = useState<EstimateCarbonFootprintOutput | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestLowerCarbonOptionsOutput | null>(null);
  const [isLoadingFootprint, setIsLoadingFootprint] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTransaction) {
      const getFootprint = async () => {
        setIsLoadingFootprint(true);
        setError(null);
        setFootprint(null);
        setSuggestions(null);
        try {
          const result = await estimateCarbonFootprint({
            transactionDescription: selectedTransaction.description,
          });
          setFootprint(result);
        } catch (e) {
          setError("Could not estimate carbon footprint. Please try again.");
          console.error(e);
        }
        setIsLoadingFootprint(false);
      };
      getFootprint();
    }
  }, [selectedTransaction]);

  const handleGetSuggestions = async () => {
    if (!selectedTransaction || !footprint) return;
    setIsLoadingSuggestions(true);
    setError(null);
    try {
      const result = await suggestLowerCarbonOptions({
        itemDescription: selectedTransaction.name,
        carbonFootprint: `${footprint.carbonFootprintKg} kg CO2e`,
      });
      setSuggestions(result);
    } catch (e) {
      setError("Could not get suggestions. Please try again.");
      console.error(e);
    }
    setIsLoadingSuggestions(false);
  };

  const handleSelectAlternative = () => {
    const pointsEarned = Math.round((footprint?.carbonFootprintKg || 0) * 0.5 * 10);
    setUserPoints(current => current + pointsEarned);
    toast({
        title: "Eco-Choice Made!",
        description: (
            <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>You've earned {pointsEarned} points!</span>
            </div>
        ),
        variant: "default",
        className: "bg-primary/10 border-primary text-primary-foreground",
    });
    setSelectedTransaction(null);
  }

  const handleClose = () => {
    setSelectedTransaction(null);
  };

  return (
    <Sheet open={!!selectedTransaction} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="sm:max-w-lg w-full flex flex-col">
        {selectedTransaction && (
          <>
            <SheetHeader className="px-6 pt-6 text-left">
              <SheetTitle className="font-headline text-2xl">{selectedTransaction.name}</SheetTitle>
              <SheetDescription>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(selectedTransaction.amount)} on {new Date(selectedTransaction.date).toLocaleDateString()}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Sparkles className="h-5 w-5 text-accent"/> Carbon Footprint Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoadingFootprint ? (
                            <>
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-20 w-full" />
                            </>
                        ) : footprint && (
                            <>
                                <div className="text-center">
                                    <p className="text-5xl font-bold font-mono text-primary">{footprint.carbonFootprintKg.toFixed(1)}</p>
                                    <p className="text-muted-foreground">kg CO₂e</p>
                                </div>
                                <Badge variant="secondary" className="w-fit">{footprint.comparisonRanking}</Badge>
                                <p className="text-sm text-muted-foreground">{footprint.breakdown}</p>
                                <Button className="w-full" onClick={handleGetSuggestions} disabled={isLoadingSuggestions}>
                                    {isLoadingSuggestions ? "Finding options..." : "Find Greener Options"}
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>

                {isLoadingSuggestions && (
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                )}

                {suggestions && (
                    <Card className="bg-primary/5">
                        <CardHeader>
                           <CardTitle className="font-headline flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-primary"/> Eco-Friendly Alternatives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {suggestions.alternatives.map((alt, index) => (
                                <Alert key={index} className="bg-background">
                                    <Info className="h-4 w-4"/>
                                    <AlertTitle className="font-semibold">{alt}</AlertTitle>
                                    <AlertDescription>
                                        <Button size="sm" variant="link" className="p-0 h-auto mt-2" onClick={handleSelectAlternative}>
                                            Choose this & earn points
                                        </Button>
                                    </AlertDescription>
                                </Alert>
                            ))}
                             <Separator />
                            <p className="text-xs text-muted-foreground italic">{suggestions.reasoning}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
            <SheetFooter className="px-6 pb-6">
                <Button variant="outline" onClick={handleClose}>
                    Close
                </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

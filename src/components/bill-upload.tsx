"use client";

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, Sparkles, Footprints, IndianRupee, ShoppingCart, Info } from "lucide-react";
import { analyzeBill, AnalyzeBillOutput } from "@/ai/flows/analyze-bill";
import { useToast } from "@/hooks/use-toast";

export default function BillUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalyzeBillOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setAnalysisResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!previewUrl) {
            toast({
                variant: "destructive",
                title: "No file selected",
                description: "Please upload an image of your bill first.",
            });
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeBill({ photoDataUri: previewUrl });
            setAnalysisResult(result);
        } catch (e) {
            console.error("Analysis failed:", e);
            setError("Failed to analyze the bill. The image might be unclear or the format is not supported. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            <div className="flex flex-col gap-1">
                <h2 className="font-headline text-3xl font-bold tracking-tight">Upload a Bill</h2>
                <p className="text-muted-foreground">Get a carbon footprint analysis for your offline purchases.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upload Receipt Image</CardTitle>
                    <CardDescription>Select a clear photo of your bill or receipt.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Receipt</Label>
                        <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {previewUrl && (
                        <div className="mt-4 border rounded-lg p-2 bg-muted/50 w-full max-w-sm mx-auto">
                            <Image src={previewUrl} alt="Bill preview" width={400} height={600} className="rounded-md object-contain max-h-80 w-auto mx-auto" data-ai-hint="receipt bill" />
                        </div>
                    )}
                    <Button onClick={handleAnalyze} disabled={!selectedFile || isLoading} className="w-full sm:w-auto">
                        <Upload className="mr-2 h-4 w-4" />
                        {isLoading ? "Analyzing..." : "Analyze Footprint"}
                    </Button>
                </CardContent>
            </Card>

            {isLoading && <AnalysisSkeleton />}

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {analysisResult && <AnalysisResult result={analysisResult} />}
        </div>
    );
}

function AnalysisSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-10 w-1/2" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-10 w-1/2" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                    </div>
                </div>
                <div>
                     <Skeleton className="h-6 w-1/4 mb-2" />
                     <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

function AnalysisResult({ result }: { result: AnalyzeBillOutput }) {
    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="h-5 w-5 text-primary" /> Analysis Complete
                </CardTitle>
                <CardDescription>
                    Here's the carbon footprint breakdown for your purchase from <span className="font-semibold">{result.vendorName}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                    <div className="bg-background/50 p-4 rounded-lg">
                        <Footprints className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-3xl font-bold font-mono text-primary">{result.carbonFootprintKg.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">kg CO₂e</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                        <IndianRupee className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-3xl font-bold font-mono text-primary">{result.totalAmount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" /> Purchased Items
                    </h4>
                    <ul className="list-disc list-inside bg-background/50 p-4 rounded-lg text-muted-foreground space-y-1">
                        {result.items.map((item, index) => (
                            <li key={index}><span className="font-medium text-foreground">{item.quantity}x {item.name}</span></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">AI Breakdown</h4>
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>{result.comparisonRanking}</AlertTitle>
                        <AlertDescription>{result.breakdown}</AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    );
}

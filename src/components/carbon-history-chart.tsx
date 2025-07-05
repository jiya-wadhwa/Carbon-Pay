"use client";

import { TrendingUp, Leaf } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { CarbonSaving } from "@/lib/types";

const chartConfig = {
  savedKg: {
    label: "CO₂ Saved (kg)",
    color: "hsl(var(--primary))",
    icon: Leaf,
  },
} satisfies ChartConfig;

const generateCarbonSavingsHistory = (): CarbonSaving[] => {
    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
            date: date.toISOString().split('T')[0],
            savedKg: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
        };
    });
};

export default function CarbonHistoryChart() {
  const [chartData, setChartData] = useState<CarbonSaving[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = generateCarbonSavingsHistory();
    const total = data.reduce((acc, curr) => acc + curr.savedKg, 0);
    setChartData(data);
    setTotalSaved(total);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
              <TrendingUp className="h-5 w-5" />
              <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
            <TrendingUp className="h-5 w-5" />
            Carbon Savings History
        </CardTitle>
        <CardDescription>
          Your estimated CO₂ savings over the last 30 days. You've saved a total of {totalSaved.toFixed(2)} kg!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
              top: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}kg`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
                <linearGradient id="fillSavedKg" x1="0" y1="0" x2="0" y2="1">
                    <stop
                    offset="5%"
                    stopColor="var(--color-savedKg)"
                    stopOpacity={0.8}
                    />
                    <stop
                    offset="95%"
                    stopColor="var(--color-savedKg)"
                    stopOpacity={0.1}
                    />
                </linearGradient>
            </defs>
            <Area
              dataKey="savedKg"
              type="natural"
              fill="url(#fillSavedKg)"
              fillOpacity={0.4}
              stroke="var(--color-savedKg)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

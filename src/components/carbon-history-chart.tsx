"use client";

import { TrendingUp, Leaf } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { carbonSavingsHistory } from "@/data/mock-data";

const chartConfig = {
  savedKg: {
    label: "CO₂ Saved (kg)",
    color: "hsl(var(--primary))",
    icon: Leaf,
  },
} satisfies ChartConfig;

export default function CarbonHistoryChart() {
  const totalSaved = carbonSavingsHistory.reduce((acc, curr) => acc + curr.savedKg, 0);

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
            data={carbonSavingsHistory}
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

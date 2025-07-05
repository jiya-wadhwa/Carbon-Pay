"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/hooks/use-app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plane,
  Utensils,
  ChevronRight,
} from "lucide-react";

const typeIcons = {
  travel: <Plane className="h-6 w-6 text-muted-foreground" />,
  shopping: <ShoppingCart className="h-6 w-6 text-muted-foreground" />,
  food: <Utensils className="h-6 w-6 text-muted-foreground" />,
  other: <div className="h-6 w-6" />,
};

const motivationalMessages = [
  "What's the move today? Let's make it a green one.",
  "Slay your carbon goals. Every small choice is a major win.",
  "Vibe check: your eco-friendly choices are on point. Keep it up!",
  "Ready to be an eco-warrior? Analyze your footprint and level up.",
  "Spill the tea: how low did your carbon footprint go this week?",
  "Choosing green is main character energy. We see you.",
  "Let's make today count for the planet. One good choice at a time.",
];

export default function Dashboard() {
  const { transactions, setSelectedTransaction } = useApp();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Recent Activity</h2>
        <p className="text-muted-foreground h-5">{message || "Review your recent transactions and their impact."}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="group transition-all hover:shadow-md hover:border-primary/50"
          >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-secondary p-3 rounded-full">
                            {typeIcons[transaction.type]}
                        </div>
                        <div>
                            <CardTitle className="font-headline text-lg">{transaction.name}</CardTitle>
                            <CardDescription>{new Date(transaction.date).toLocaleDateString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</CardDescription>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(transaction.amount)}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="ghost" className="w-full justify-between" onClick={() => setSelectedTransaction(transaction)}>
                    Analyze Footprint
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

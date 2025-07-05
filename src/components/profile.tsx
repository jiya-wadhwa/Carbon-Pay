"use client";

import { useApp } from "@/hooks/use-app";
import { currentUser } from "@/data/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Trophy } from "lucide-react";

export default function Profile() {
  const { userPoints } = useApp();

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-1">
          <h2 className="font-headline text-3xl font-bold tracking-tight">Your Eco-Profile</h2>
          <p className="text-muted-foreground">Here's a summary of your green journey.</p>
      </div>
      <Card>
        <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
          <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} data-ai-hint="profile" />
              <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold font-headline">{currentUser.name}</h3>
              <p className="text-muted-foreground">Eco-Warrior in Training</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Points</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Earn more by making green choices!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{currentUser.rank}</div>
             <p className="text-xs text-muted-foreground">
              Keep climbing to the top!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

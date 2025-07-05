"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboardData, currentUser } from "@/data/mock-data";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Green Guardians</h2>
        <p className="text-muted-foreground">Climb the ranks and become a legend in the CarbonPay community.</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Guardian</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.sort((a,b) => a.rank - b.rank).map((user, index) => (
              <TableRow key={user.id} className={cn(user.id === currentUser.id && "bg-primary/10 hover:bg-primary/20")}>
                <TableCell className="font-bold text-lg">
                  <div className="flex items-center justify-center">
                    {index < 3 ? (
                      <Trophy className={cn("h-6 w-6", 
                          index === 0 && "text-yellow-400 fill-yellow-400/50", 
                          index === 1 && "text-slate-400 fill-slate-400/50", 
                          index === 2 && "text-amber-600 fill-amber-600/50"
                      )} /> 
                    ) : (
                      <span className="text-muted-foreground">{user.rank}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">{user.name}</span>
                      {user.id === currentUser.id && <p className="text-xs text-primary font-semibold">This is you!</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-lg font-medium">{user.points.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

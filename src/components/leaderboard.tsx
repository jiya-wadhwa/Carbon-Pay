"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
        <h2 className="font-headline text-3xl font-bold tracking-tight">Top Eco-Heroes</h2>
        <p className="text-muted-foreground">See who's leading the charge in reducing their carbon footprint.</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.sort((a,b) => a.rank - b.rank).map((user, index) => (
              <TableRow key={user.id} className={cn(user.id === currentUser.id && "bg-primary/10 hover:bg-primary/20")}>
                <TableCell className="font-bold text-lg">
                  <div className="flex items-center gap-2">
                    {index < 3 ? <Trophy className={cn("h-5 w-5", 
                        index === 0 && "text-yellow-500", 
                        index === 1 && "text-gray-400", 
                        index === 2 && "text-yellow-700"
                        )} /> : <span>{user.rank}</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-medium">{user.points.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

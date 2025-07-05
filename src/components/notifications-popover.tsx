"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useApp } from "@/hooks/use-app";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function NotificationsPopover() {
  const { transactions } = useApp();
  const [hasUnread, setHasUnread] = useState(true);

  // For this example, we'll just show the last 3 transactions as notifications.
  const recentTransactions = transactions.slice(0, 3);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setHasUnread(false);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {recentTransactions.length > 0 ? (
              <ul className="divide-y">
                {recentTransactions.map((transaction) => (
                  <li key={transaction.id} className="p-4 text-sm hover:bg-muted/50">
                    <p className="font-medium">Analysis Complete</p>
                    <p className="text-muted-foreground">
                      Your transaction for "{transaction.name}" has been processed.
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-sm text-center text-muted-foreground">No new notifications.</p>
            )}
          </CardContent>
          {recentTransactions.length > 0 && (
            <>
                <Separator />
                <CardFooter className="p-2">
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setHasUnread(false)}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                </CardFooter>
            </>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}

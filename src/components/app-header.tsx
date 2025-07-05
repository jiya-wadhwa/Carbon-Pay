"use client";

import { useApp } from "@/hooks/use-app";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const viewTitles: { [key: string]: string } = {
  dashboard: "Dashboard",
  leaderboard: "Leaderboard",
  rewards: "Rewards",
  "bill-upload": "Upload Bill",
  profile: "Profile",
};

export default function AppHeader() {
  const { activeView } = useApp();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-semibold tracking-tight">
          {viewTitles[activeView]}
        </h1>
      </div>
      
      {mounted ? (
        <div className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            <Switch
                checked={resolvedTheme === "dark"}
                onCheckedChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
            />
            <Moon className="h-5 w-5" />
        </div>
        ) : (
          <Skeleton className="h-6 w-[100px]" />
        )
      }
    </header>
  );
}

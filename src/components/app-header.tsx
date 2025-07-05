"use client";

import { useApp } from "@/hooks/use-app";
import { SidebarTrigger } from "@/components/ui/sidebar";

const viewTitles: { [key: string]: string } = {
  dashboard: "Dashboard",
  leaderboard: "Leaderboard",
  rewards: "Rewards",
  "bill-upload": "Upload Bill",
  profile: "Profile",
};

export default function AppHeader() {
  const { activeView } = useApp();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-semibold tracking-tight">
          {viewTitles[activeView]}
        </h1>
      </div>
    </header>
  );
}

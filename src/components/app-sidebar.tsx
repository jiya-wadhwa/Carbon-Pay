"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Trophy,
  Gift,
  Leaf,
  FileScan,
  User,
} from "lucide-react";
import { useApp } from "@/hooks/use-app";
import type { View } from "@/lib/types";

const menuItems: { id: View, icon: React.ElementType, label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "rewards", icon: Gift, label: "Rewards" },
  { id: "bill-upload", icon: FileScan, label: "Upload Bill" },
  { id: "profile", icon: User, label: "Profile" },
];

export function AppSidebar() {
  const { activeView, setActiveView, userPoints } = useApp();
  const leafScale = 1 + Math.min(userPoints / 2500, 1);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-primary transition-transform duration-500 ease-in-out" style={{ transform: `scale(${leafScale})` }}/>
          <h2 className="font-headline text-2xl font-bold tracking-tight">
            CarbonPay
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.id)}
                isActive={activeView === item.id}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

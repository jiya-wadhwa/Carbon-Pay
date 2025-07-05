"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Trophy,
  Gift,
  Leaf,
  LogOut,
} from "lucide-react";
import { useApp } from "@/hooks/use-app";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "rewards", icon: Gift, label: "Rewards" },
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
                // @ts-ignore
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
      <Separator className="my-2"/>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} data-ai-hint="profile" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{currentUser.name}</span>
            <Badge variant="secondary" className="w-fit">
              {userPoints} Points
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

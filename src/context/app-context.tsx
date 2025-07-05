"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import type { Transaction, View } from "@/lib/types";
import { transactions as mockTransactions, currentUser } from "@/data/mock-data";

interface AppContextType {
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
  userPoints: number;
  setUserPoints: Dispatch<SetStateAction<number>>;
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
  dailySteps: number;
  setDailySteps: Dispatch<SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [userPoints, setUserPoints] = useState(currentUser.points);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dailySteps, setDailySteps] = useState(8500);

  const value = {
    activeView,
    setActiveView,
    userPoints,
    setUserPoints,
    transactions,
    selectedTransaction,
    setSelectedTransaction,
    dailySteps,
    setDailySteps,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

"use client";

import { AppProvider } from "@/context/app-context";
import { useApp } from "@/hooks/use-app";
import AppContainer from "@/components/app-container";
import Dashboard from "@/components/dashboard";
import Leaderboard from "@/components/leaderboard";
import Rewards from "@/components/rewards";
import TransactionDetails from "@/components/transaction-details";
import BillUpload from "@/components/bill-upload";

function CarbonPayApp() {
  const { activeView } = useApp();

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "leaderboard":
        return <Leaderboard />;
      case "rewards":
        return <Rewards />;
      case "bill-upload":
        return <BillUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContainer>
      {renderContent()}
      <TransactionDetails />
    </AppContainer>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <CarbonPayApp />
    </AppProvider>
  );
}

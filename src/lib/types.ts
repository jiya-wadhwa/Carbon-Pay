export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  type: 'travel' | 'shopping' | 'food' | 'other';
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  brand: string;
  logoUrl: string;
  logoHint?: string;
}

export type View = "dashboard" | "leaderboard" | "rewards" | "bill-upload" | "profile";

export interface CarbonSaving {
    date: string;
    savedKg: number;
}

import type { Transaction, User, Reward } from "@/lib/types";

export const transactions: Transaction[] = [
  {
    id: "txn_1",
    name: "Round-trip flight",
    description: "Flight from New York (JFK) to London (LHR), economy class.",
    amount: 68000.0,
    date: "2024-07-15",
    type: "travel",
  },
  {
    id: "txn_2",
    name: "Amazon Order",
    description: "Order of electronics including a new laptop and headphones.",
    amount: 116000.0,
    date: "2024-07-14",
    type: "shopping",
  },
  {
    id: "txn_3",
    name: "Uber Ride",
    description: "15-mile ride across town during peak hours.",
    amount: 3640.0,
    date: "2024-07-12",
    type: "travel",
  },
  {
    id: "txn_4",
    name: "Steakhouse Dinner",
    description: "Dinner for two at a high-end steakhouse.",
    amount: 20000.0,
    date: "2024-07-11",
    type: "food",
  },
  {
    id: "txn_5",
    name: "Weekly Groceries",
    description: "Grocery shopping including various meats, imported cheeses, and packaged goods.",
    amount: 14400.0,
    date: "2024-07-10",
    type: "food",
  },
];

export const currentUser: User = {
  id: 5,
  name: "You",
  avatar: "https://placehold.co/100x100.png",
  points: 1250,
  rank: 5,
};

export const leaderboardData: User[] = [
  { id: 1, name: "Elena V.", avatar: "https://placehold.co/100x100.png", points: 4820, rank: 1 },
  { id: 2, name: "Marcus R.", avatar: "https://placehold.co/100x100.png", points: 4510, rank: 2 },
  { id: 3, name: "Aisha K.", avatar: "https://placehold.co/100x100.png", points: 3980, rank: 3 },
  { id: 4, name: "David L.", avatar: "https://placehold.co/100x100.png", points: 2130, rank: 4 },
  currentUser,
  { id: 6, name: "Sophie C.", avatar: "https://placehold.co/100x100.png", points: 980, rank: 6 },
];

export const rewards: Reward[] = [
  {
    id: "rew_1",
    name: "20% Off Your Order",
    description: "Get 20% off any purchase of sustainable goods.",
    points: 1000,
    brand: "EcoFriendly Goods",
    logoUrl: "https://placehold.co/400x200.png",
  },
  {
    id: "rew_2",
    name: "₹1200 Gift Card",
    description: "A ₹1200 gift card for fair-trade coffee.",
    points: 1500,
    brand: "Ethical Bean",
    logoUrl: "https://placehold.co/400x200.png",
  },
  {
    id: "rew_3",
    name: "Free Reusable Bottle",
    description: "Claim a free stainless steel reusable water bottle.",
    points: 2000,
    brand: "Planet First",
    logoUrl: "https://placehold.co/400x200.png",
  },
    {
    id: "rew_4",
    name: "1-Month Subscription",
    description: "One month of carbon-neutral meal deliveries.",
    points: 3500,
    brand: "GreenPlate",
    logoUrl: "https://placehold.co/400x200.png",
  },
];

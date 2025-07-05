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
    name: "Butter Chicken Dinner",
    description: "Dinner for two, featuring butter chicken and naan.",
    amount: 2500.0,
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
  { id: 1, name: "Priya Gupta", avatar: "https://placehold.co/100x100.png", points: 4820, rank: 1 },
  { id: 2, name: "Rohan Patel", avatar: "https://placehold.co/100x100.png", points: 4510, rank: 2 },
  { id: 3, name: "Anika Gupta", avatar: "https://placehold.co/100x100.png", points: 3980, rank: 3 },
  { id: 4, name: "Vikram Singh", avatar: "https://placehold.co/100x100.png", points: 2130, rank: 4 },
  currentUser,
  { id: 6, name: "Isha Kumar", avatar: "https://placehold.co/100x100.png", points: 980, rank: 6 },
];

export const rewards: Reward[] = [
  {
    id: "rew_1",
    name: "25% Off Apparels",
    description: "Get 25% off on your next purchase of ethnic and sustainable wear.",
    points: 2500,
    brand: "Fabindia",
    logoUrl: "https://placehold.co/400x200.png",
  },
  {
    id: "rew_2",
    name: "Classic Masala Dosa",
    description: "Enjoy a complimentary Classic Masala Dosa on your next visit.",
    points: 1200,
    brand: "Sagar Ratna",
    logoUrl: "https://placehold.co/400x200.png",
  },
  {
    id: "rew_3",
    name: "₹500 Gift Voucher",
    description: "Redeem a ₹500 voucher on hand-spun and hand-woven Khadi products.",
    points: 2000,
    brand: "Khadi India",
    logoUrl: "https://placehold.co/400x200.png",
  },
    {
    id: "rew_4",
    name: "Festive Sweets Hamper",
    description: "A special hamper of delicious, traditional Indian sweets.",
    points: 3000,
    brand: "Haldiram's",
    logoUrl: "https://placehold.co/400x200.png",
  },
];

import { NavItem } from "@/types";

export enum ACCOUNT_STATUS {
  "ACTIVE",
  "BLACKLIST",
  "BANNED",
}

export enum ACCOUNT_ROLE {
  "ADMIN",
  "MOD",
  "USER",
}
export enum ACCOUNT_TYPE {
  "FREE",
  "PREMIUM",
}

export type Users = {
  uid: string;
  stripeCustomerId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneno: string;
  profilePicUrl?: string | null;
  emailVerified: boolean;
  accountStatus: ACCOUNT_STATUS;
  role: ACCOUNT_ROLE;
  accountType: ACCOUNT_TYPE;
  identityVerified: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  createdAt: string;
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Auctions",
    url: "/dashboard/auctions",
    icon: "product",
    isActive: false,
    items: [], // No child items
  },
];

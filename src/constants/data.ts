import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
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

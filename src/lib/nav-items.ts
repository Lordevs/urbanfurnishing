import { Home, Boxes, Armchair, Sparkles, CalendarDays } from "lucide-react";
import { ROUTES } from "@/constants/route";
import { NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: ROUTES.HOME,
    icon: Home,
  },
  {
    title: "Packages",
    href: ROUTES.PACKAGES,
    icon: Boxes,
  },
  {
    title: "Single Products",
    href: ROUTES.SINGLE_PRODUCTS,
    icon: Armchair,
  },
  {
    title: "Our New Design Expert",
    href: ROUTES.OUR_NEW_DESIGN_EXPERT,
    icon: Sparkles,
  },
  {
    title: "Book Consultation",
    href: ROUTES.BOOK_CONSULTATION,
    icon: CalendarDays,
  },
];

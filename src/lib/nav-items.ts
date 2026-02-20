import { Home, Users, Briefcase, Mail } from "lucide-react";
import { ROUTES } from "@/constants/route";
import { NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: ROUTES.HOME,
    icon: Home,
  },
  {
    title: "About",
    href: ROUTES.ABOUT,
    icon: Users,
  },
  {
    title: "How We Work",
    href: ROUTES.HOW_WE_WORK,
    icon: Briefcase,
  },
  {
    title: "Contact",
    href: ROUTES.CONTACT,
    icon: Mail,
  },
];

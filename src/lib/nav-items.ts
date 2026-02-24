import { Home, Users, Briefcase, Mail, PackagePlus } from "lucide-react";
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
    title: "Packages",
    href: ROUTES.PACKAGES,
    icon: PackagePlus,
  },
  {
    title: "Contact",
    href: ROUTES.CONTACT,
    icon: Mail,
  },
];

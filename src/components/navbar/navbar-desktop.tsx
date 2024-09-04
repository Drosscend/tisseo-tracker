"use client";

import { TramFrontIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { links } from "./navbar-links";

export function NavbarDesktop() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <TramFrontIcon className="size-6" />
        <span className="sr-only">Tisséo Tracker</span>
      </Link>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn("text-muted-foreground hover:text-foreground transition-colors", pathname === href && "text-foreground")}
        >
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

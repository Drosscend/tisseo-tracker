"use client";

import { MenuIcon, TramFrontIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { links } from "./navbar-links";

export function NavbarMobile() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <TramFrontIcon className="size-6" />
            <span className="sr-only">Tisséo Tracker</span>
          </Link>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={cn("text-muted-foreground hover:text-foreground", pathname != href && "text-muted-foreground")}>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

import { NavbarDesktop } from "@/components/navbar/navbar-desktop";
import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { ModeToggle } from "@/components/navbar/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <NavbarDesktop />
          <NavbarMobile />
        </div>
        <ModeToggle />
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Home</h1>
        </div>
      </main>
    </div>
  );
}

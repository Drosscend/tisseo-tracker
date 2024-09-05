import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/navbar/mode-toggle";
import { NavbarDesktop } from "@/components/navbar/navbar-desktop";
import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tisseo Tracker",
  description: "Tisseo Tracker is a web app that helps you track Tisseo buses and trams in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen w-full flex-col">
            <header className="bg-background sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 md:px-6">
              <div className="flex items-center gap-4">
                <NavbarDesktop />
                <NavbarMobile />
              </div>
              <ModeToggle />
            </header>
            <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

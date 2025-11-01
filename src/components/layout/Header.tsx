"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="ghost"
          className={cn(
            "justify-start",
            pathname === link.href ? "bg-accent text-accent-foreground" : "",
            isMobile ? "w-full text-lg py-6" : ""
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/assets/logo.png" alt="ENSTA Bretagne Logo" width={40} height={40} className="rounded-full" />
          <span className="font-bold font-headline">Polyglot Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-2">
          <NavLinkItems />
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                  <Image src="/assets/logo.png" alt="ENSTA Bretagne Logo" width={40} height={40} className="rounded-full" />
                  <span className="font-bold font-headline">Polyglot Hub</span>
                </Link>
                <nav className="flex flex-col space-y-3">
                  <NavLinkItems isMobile={true} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

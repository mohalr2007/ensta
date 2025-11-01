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
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logoImage = PlaceHolderImages.find(p => p.id === "logo");


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
            isMobile ? "w-full text-lg py-6" : "text-base"
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left section - Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={40} height={40} className="rounded-full" />}
            <span className="font-bold font-headline">Polyglot Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex justify-center">
          <NavLinkItems />
        </nav>

        {/* Right section - Controls */}
        <div className="flex items-center justify-end space-x-2">
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
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={40} height={40} className="rounded-full" />}
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

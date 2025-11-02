
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logoImage = PlaceHolderImages.find(p => p.id === "logo");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/home${speciality ? `?speciality=${speciality}` : ''}`, label: t.nav.home },
    { href: `/about${speciality ? `?speciality=${speciality}` : ''}`, label: t.nav.about },
    { href: `/contact${speciality ? `?speciality=${speciality}` : ''}`, label: t.nav.contact },
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
            pathname === link.href.split('?')[0] ? "bg-accent text-accent-foreground" : "",
            isMobile ? "w-full text-lg py-6" : "text-base"
          )}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Left section - Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={40} height={40} className="rounded-full" />}
            <span className="font-bold font-headline hidden sm:inline-block">
              ENSTA {speciality && <span className="uppercase text-primary">{speciality}</span>}
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLinkItems />
          </nav>
        </div>

        {/* Right section - Controls */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                  {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={40} height={40} className="rounded-full" />}
                  <span className="font-bold font-headline">
                    ENSTA {speciality && <span className="uppercase text-primary">{speciality}</span>}
                  </span>
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

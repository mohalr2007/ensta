
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

export function Header({ navItems }: { navItems: NavItem[] }) {
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const logoImage = PlaceHolderImages.find(p => p.id === "logo");
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section - Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={32} height={32} className="rounded-full" />}
          <span className="font-bold font-headline text-lg">
            ENSTA {speciality && <span className="uppercase text-primary">{speciality}</span>}
          </span>
        </Link>

        {/* Right section - Desktop Nav & Controls */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col h-full">
                  <div className="flex-grow mt-8">
                    <nav className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.label}>
                          <Button
                            variant="ghost"
                            className="justify-start text-lg"
                            onClick={item.onClick}
                          >
                            {item.icon}
                            {item.label}
                          </Button>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                  <div className="flex items-center justify-center gap-2 pb-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
             <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
             </div>
          )}
        </div>
      </div>
    </header>
  );
}

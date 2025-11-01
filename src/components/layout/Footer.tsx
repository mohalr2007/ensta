"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function FooterContent() {
  const { t } = useLanguage();
  const logoImage = PlaceHolderImages.find(p => p.id === "logo");
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={24} height={24} className="rounded-full" />}
          <span className="font-bold font-headline text-lg">ENSTA</span>
        </div>
        <p className="text-center md:text-left text-sm">
          {t.footer.copyright}
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:text-primary transition-colors">
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
  );
}

export function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8 flex justify-center items-center">
        {isClient ? <FooterContent /> : (
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-64" />
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

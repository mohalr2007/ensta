
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

// X logo SVG component
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);


function FooterContent() {
  const { t } = useLanguage();
  const logoImage = PlaceHolderImages.find(p => p.id === "logo");
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/ENSTA.Alger/", name: "Facebook" },
    { icon: XIcon, href: "https://x.com/ENSTA_Alger", name: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/school/ensta-alger/", name: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@ENSTAAlger/featured", name: "YouTube" },
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
            <Link key={index} href={link.href} className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${link.name} page`}>
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8 flex justify-center items-center">
        <FooterContent />
      </div>
    </footer>
  );
}

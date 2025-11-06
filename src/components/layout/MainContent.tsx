
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Home, Info, Mail, GraduationCap } from "lucide-react";
import { Dock } from "@/components/layout/Dock";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Chatbot } from "@/components/chatbot/Chatbot";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const router = useRouter();
  const { t } = useLanguage();
  const [isChatOpen, setChatOpen] = useState(false);

  const isLandingPage = pathname === '/';

  const logoImage = PlaceHolderImages.find(p => p.id === 'logo');

  const navItems = [
    {
      id: 'home',
      icon: <Home className="w-5 h-5" />,
      label: t.nav.home,
      onClick: () => router.push(`/home${speciality ? `?speciality=${speciality}` : ''}`),
    },
    {
      id: 'about',
      icon: <Info className="w-5 h-5" />,
      label: t.nav.about,
      onClick: () => router.push(`/about${speciality ? `?speciality=${speciality}` : ''}`),
    },
    {
      id: 'contact',
      icon: <Mail className="w-5 h-5" />,
      label: t.nav.contact,
      onClick: () => router.push(`/contact${speciality ? `?speciality=${speciality}` : ''}`),
    },
  ];

  const specialityItem = speciality ? {
    id: 'speciality',
    icon: (
      <div className="flex flex-col items-center justify-center text-primary font-bold uppercase text-xs">
        <GraduationCap className="w-4 h-4 mb-0.5" />
        {speciality}
      </div>
    ),
    label: t.nav.devHub,
    onClick: () => setChatOpen(true),
  } : null;

  const logoItem = {
    id: 'logo',
    icon: (
      <div className="flex flex-col items-center justify-center">
        {logoImage && (
          <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            width={28}
            height={28}
            className="rounded-full"
          />
        )}
      </div>
    ),
    label: "Go to Home",
    isComponent: true,
    onClick: () => router.push('/'),
  };
  
  const controlItems = [
    ...(specialityItem ? [specialityItem] : []),
    {
      id: 'lang-switcher',
      icon: <LanguageSwitcher />,
      label: 'Language',
      isComponent: true,
    },
    {
      id: 'theme-toggle',
      icon: <ThemeToggle />,
      label: 'Theme',
      isComponent: true,
    }
  ];

  const dockItems = [
    ...navItems,
    { isSeparator: true, id: 'sep1' },
    logoItem,
    { isSeparator: true, id: 'sep2' },
    ...controlItems,
  ].filter(Boolean) as any[];
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
      {!isLandingPage && (
        <>
          <Dock items={dockItems} />
          <Footer />
        </>
      )}
      <Chatbot isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}


"use client";

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/components/providers/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState }from "react";
import { Home, Info, Mail } from "lucide-react";
import { Dock } from "@/components/layout/Dock";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";


const metadataConfig: Metadata = {
  title: "ENSTA",
  description: "A modern school hub with bilingual support.",
};

function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const router = useRouter();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const logoItem = {
    id: 'logo',
    icon: (
      <div className="flex flex-col items-center justify-center">
        {logoImage && (
          <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        {speciality && (
          <span className="text-xs font-bold uppercase text-primary mt-1">
            {speciality}
          </span>
        )}
      </div>
    ),
    label: "Go to Home",
    isComponent: true,
    onClick: () => router.push('/'),
  };
  
  const controlItems = [
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
    },
  ];

  const dockItems = [
    ...navItems,
    { isSeparator: true, id: 'sep1' },
    logoItem,
    { isSeparator: true, id: 'sep2' },
    ...controlItems,
  ];
  
  const showNav = isClient && pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
      {showNav && (
        <>
          <Dock items={dockItems} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadataConfig.title)}</title>
        <meta name="description" content={String(metadataConfig.description)} />
        <link rel="icon" href="https://elearning.ensta.edu.dz/pluginfile.php/1/theme_academi/footerlogo/1715699273/ENSTA%20logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <MainContent>{children}</MainContent>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

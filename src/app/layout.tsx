
"use client";

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/components/providers/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dock } from "@/components/layout/Dock";
import { Home, Info, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


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

  const navItems = [
    {
      icon: <Home />,
      label: t.nav.home,
      onClick: () => router.push(`/home${speciality ? `?speciality=${speciality}` : ''}`),
    },
    {
      icon: <Info />,
      label: t.nav.about,
      onClick: () => router.push(`/about${speciality ? `?speciality=${speciality}` : ''}`),
    },
    {
      icon: <Mail />,
      label: t.nav.contact,
      onClick: () => router.push(`/contact${speciality ? `?speciality=${speciality}` : ''}`),
    },
  ];

  const showNav = isClient && pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      {showNav && <Header navItems={navItems} />}
      <main className="flex-grow pt-16">
        {children}
      </main>
      {showNav && <Footer />}
      {showNav && !isMobile && <Dock items={navItems} />}
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


"use client";

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/components/providers/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState }from "react";
import { Home, Info, Mail, GraduationCap, MessageSquare } from "lucide-react";
import { Dock } from "@/components/layout/Dock";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import Script from "next/script";


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

  const specialityItem = speciality ? {
    id: 'speciality',
    icon: (
      <div className="flex flex-col items-center justify-center text-primary font-bold uppercase text-xs">
        <GraduationCap className="w-4 h-4 mb-0.5" />
        {speciality}
      </div>
    ),
    label: `Specialization: ${speciality.toUpperCase()}`,
    isComponent: true,
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
    },
    {
        id: 'chatbot',
        icon: <MessageSquare className="w-5 h-5" />,
        label: 'Chatbot',
        onClick: () => {
            // @ts-ignore
            if (window.chatbase) {
                // @ts-ignore
                window.chatbase('open');
            }
        },
    }
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
        <Script id="chatbase-embed">
        {`
            (function(){
                if(!window.chatbase || window.chatbase("getState") !== "initialized") {
                    window.chatbase = (...arguments) => {
                        if(!window.chatbase.q) {
                            window.chatbase.q = [];
                        }
                        window.chatbase.q.push(arguments);
                    };
                    window.chatbase = new Proxy(window.chatbase, {
                        get(target, prop) {
                            if(prop === "q") {
                                return target.q;
                            }
                            return (...args) => target(prop, ...args);
                        }
                    });
                }
                const onLoad = function() {
                    const script = document.createElement("script");
                    script.src = "https://www.chatbase.co/embed.min.js";
                    script.id = "eTD69Wu1TTnWLrVc8PnZO";
                    script.domain = "www.chatbase.co";
                    document.body.appendChild(script);
                };
                if(document.readyState === "complete") {
                    onLoad();
                } else {
                    window.addEventListener("load", onLoad);
                }
            })();
        `}
        </Script>
      </body>
    </html>
  );
}

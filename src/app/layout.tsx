
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainContent from "@/components/layout/MainContent";
import { Suspense } from "react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "ENSTA",
  description: "A modern school hub with bilingual support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://elearning.ensta.edu.dz/pluginfile.php/1/theme_academi/footerlogo/1715699273/ENSTA%20logo.png" type="image/png" />
      </head>
      <body className={cn("font-body antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <Suspense>
              <MainContent>{children}</MainContent>
            </Suspense>
              <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

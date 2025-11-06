
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainContent from "@/components/layout/MainContent";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
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
      <body className={cn("font-body antialiased", poppins.variable)}>
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

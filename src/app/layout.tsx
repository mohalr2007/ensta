
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import MainContent from "@/components/layout/MainContent";


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
    <LanguageProvider>
        <Suspense fallback={
            <html lang="en" suppressHydrationWarning>
                <body className="font-body antialiased">
                    <div className="w-full h-screen flex justify-center items-center">
                        <Skeleton className="w-full h-full" />
                    </div>
                </body>
            </html>
        }>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                </head>
                <body className={cn("font-body antialiased")}>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                        <MainContent>{children}</MainContent>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </Suspense>
    </LanguageProvider>
  );
}


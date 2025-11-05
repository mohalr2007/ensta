
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Megaphone, Calendar as CalendarIcon, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const isMi = speciality === 'mi';

  const heroImage = PlaceHolderImages.find(p => p.id === (isMi ? 'hero-mi' : 'hero-st'));

  const announcementImages = [
    PlaceHolderImages.find(p => p.id === "announcement1"),
    PlaceHolderImages.find(p => p.id === "announcement2"),
    PlaceHolderImages.find(p => p.id === "announcement3"),
  ];

  const features = [
    {
      icon: Megaphone,
      title: t.home.feature1Title,
      description: t.home.feature1Desc,
    },
    {
      icon: CalendarIcon,
      title: t.home.feature2Title,
      description: t.home.feature2Desc,
    },
    {
      icon: Lightbulb,
      title: t.home.feature3Title,
      description: t.home.feature3Desc,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[60vh] text-white">
        {!isClient ? (
          <Skeleton className="w-full h-full" />
        ) : (
          heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-secondary/70 to-accent/70 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            {t.home.heroTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
            {t.home.heroSubtitle}
          </p>
          <Button asChild size="lg" className={cn("mt-8 text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90")}>
            <Link href={`/about${speciality ? `?speciality=${speciality}` : ''}`}>
              {t.home.learnMore} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full p-4 mb-4">
                 <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              {t.home.announcementsTitle}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.home.announcementsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.home.announcements.map((announcement, index) => (
              <Card key={index} className="overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                {announcementImages[index] && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={announcementImages[index]?.imageUrl || ''}
                      alt={announcementImages[index]?.description || ''}
                      data-ai-hint={announcementImages[index]?.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{announcement.date}</p>
                  <p>{announcement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

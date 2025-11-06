
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Megaphone, Calendar as CalendarIcon, Lightbulb, Camera } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
  
  const galleryImages = [
    PlaceHolderImages.find(p => p.id === 'gallery-1'),
    PlaceHolderImages.find(p => p.id === 'gallery-2'),
    PlaceHolderImages.find(p => p.id === 'gallery-3'),
    PlaceHolderImages.find(p => p.id === 'gallery-4'),
    PlaceHolderImages.find(p => p.id === 'gallery-5'),
    PlaceHolderImages.find(p => p.id === 'gallery-6'),
  ].filter(Boolean) as any[];


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

  if (!isClient) {
    return (
       <div className="flex flex-col items-center">
          <section className="w-full relative h-[60vh] text-white">
             <Skeleton className="w-full h-full" />
             <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40" />
          </section>
          <Skeleton className="w-full max-w-6xl h-48 my-16" />
          <Skeleton className="w-full h-96" />
       </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[60vh] text-white">
        {heroImage && (
           <Image
             src={heroImage.imageUrl}
             alt={heroImage.description}
             data-ai-hint={heroImage.imageHint}
             fill
             className="object-cover object-center"
             priority
           />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 flex flex-col items-center justify-center text-center p-4">
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

      {/* Gallery Section */}
      <section className="w-full bg-secondary/5 dark:bg-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12 px-4">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
                <Camera className="w-8 h-8"/>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              {t.home.galleryTitle}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.home.gallerySubtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {galleryImages.map((image, index) => (
                 <div key={image.id} className={cn(
                    "group relative overflow-hidden rounded-xl shadow-lg",
                    index === 0 || index === 5 ? "lg:col-span-2 lg:row-span-2" : ""
                 )}>
                   <Image
                     src={image.imageUrl}
                     alt={image.description}
                     data-ai-hint={image.imageHint}
                     width={600}
                     height={600}
                     className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                 </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

    


"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Code, Camera } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import CircularGallery from "@/components/ui/CircularGallery";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMi = speciality === 'mi';
  const isSt = speciality === 'st';

  const heroImage = PlaceHolderImages.find(p => p.id === (isSt ? 'hero-st' : 'hero-mi'));
  
  const miGalleryImages = [
    PlaceHolderImages.find(p => p.id === 'gallery-1'),
    PlaceHolderImages.find(p => p.id === 'gallery-2'),
    PlaceHolderImages.find(p => p.id === 'gallery-3'),
    PlaceHolderImages.find(p => p.id === 'gallery-4'),
    PlaceHolderImages.find(p => p.id === 'gallery-5'),
    PlaceHolderImages.find(p => p.id === 'gallery-6'),
  ].filter(Boolean).map(img => ({ image: img.imageUrl, text: img.description })) as any[];

  const stGalleryImages = [
    PlaceHolderImages.find(p => p.id === 'st-gallery-1'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-2'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-3'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-4'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-5'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-6'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-7'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-8'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-9'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-10'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-11'),
    PlaceHolderImages.find(p => p.id === 'st-gallery-12'),
  ].filter(Boolean).map(img => ({ image: img.imageUrl, text: img.description })) as any[];


  const features = [
    {
      icon: Code,
      title: t.home.feature2Title,
      description: t.home.feature2Desc,
    },
  ];
  
  const heroSubtitle = isMi ? t.home.heroSubtitle_mi : t.home.heroSubtitle_st;

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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg"
          >
            {t.home.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className={cn("mt-8 text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90")}>
              <Link href={`/about${speciality ? `?speciality=${speciality}` : ''}`}>
                {t.home.learnMore} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center">
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
            <div className="h-[60vh]">
               <CircularGallery 
                items={isSt ? stGalleryImages : miGalleryImages} 
              />
            </div>
        </div>
      </section>
      
    </div>
  );
}

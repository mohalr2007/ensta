
"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Landmark, BrainCircuit, ShieldCheck, Settings, BatteryCharging, Network, Factory, Wrench, Cpu, Bot, Component, Package, Train, Cog, Droplets, FlaskConical, TrainFront } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSearchParams } from "next/navigation";
import LogoLoop from "@/components/ui/logo-loop";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function AboutPageContent() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const miSpecializations = [
    {
      ...t.about.miSpecializations[0],
      icon: BrainCircuit,
      image: PlaceHolderImages.find(p => p.id === 'mi-ai'),
    },
    {
      ...t.about.miSpecializations[1],
      icon: ShieldCheck,
      image: PlaceHolderImages.find(p => p.id === 'mi-security'),
    }
  ];
  
  const stSpecializationData = [
    { icon: Settings, imageId: 'st-energy-mechanics' },
    { icon: BatteryCharging, imageId: 'st-renewable-energy' },
    { icon: Network, imageId: 'st-telecom' },
    { icon: Factory, imageId: 'st-automation' },
    { icon: Wrench, imageId: 'st-maintenance' },
    { icon: Cpu, imageId: 'st-embedded' },
    { icon: Bot, imageId: 'st-mechatronics' },
    { icon: Component, imageId: 'st-industrial-eng' },
    { icon: Package, imageId: 'st-supply-chain' },
    { icon: Train, imageId: 'st-transport' },
    { icon: Cog, imageId: 'st-mechanical-eng' },
    { icon: Droplets, imageId: 'st-water' },
    { icon: FlaskConical, imageId: 'st-organic' },
    { icon: TrainFront, imageId: 'st-electric-traction' },
  ];

  const stSpecializations = t.about.stSpecializations.map((spec, index) => ({
    ...spec,
    ...stSpecializationData[index],
    image: PlaceHolderImages.find(p => p.id === stSpecializationData[index].imageId),
  }));


  const miSpecializationLogos = miSpecializations.map((spec) => ({
    node: (
      <div className="w-[350px] md:w-[400px]">
        <Card key={spec.title} className="group overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-primary h-full">
          {spec.image && (
            <div className="relative h-56 w-full">
              <Image
                src={spec.image.imageUrl}
                alt={spec.image.description}
                data-ai-hint={spec.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <spec.icon className="h-8 w-8" />
              </div>
            </div>
            <p className="text-sm font-semibold text-primary">Domaine MI</p>
            <h3 className="text-xl font-bold font-headline mt-2">{spec.title}</h3>
            <p className="mt-2 text-destructive font-semibold">{spec.tag}</p>
          </CardContent>
        </Card>
      </div>
    ),
  }));

  const stSpecializationLogos = stSpecializations.map((spec) => ({
    node: (
      <div className="w-[350px] md:w-[400px]">
        <Card key={spec.title} className="group overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-accent h-full">
          {spec.image && (
            <div className="relative h-56 w-full">
              <Image
                src={spec.image.imageUrl}
                alt={spec.image.description}
                data-ai-hint={spec.image.imageHint}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-accent/10 text-accent p-3 rounded-full">
                <spec.icon className="h-8 w-8" />
              </div>
            </div>
            <p className="text-sm font-semibold text-accent">Domaine ST</p>
            <h3 className="text-xl font-bold font-headline mt-2">{spec.title}</h3>
            <p className="mt-2 text-destructive font-semibold">{spec.tag}</p>
          </CardContent>
        </Card>
      </div>
    ),
  }));

  const isMi = speciality === 'mi';
  const isSt = speciality === 'st';

  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto text-center py-12 md:py-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-secondary-foreground">
            {t.about.title}
          </h1>
          <p className="mt-4 text-base md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </div>
      <div className="container mx-auto py-12 md:py-20 px-4">
        <Card className="border-none shadow-none mb-16 md:mb-24 text-center">
          <CardHeader className="p-0">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <Target className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-headline">{t.about.missionTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 md:pt-6">
            <p className="text-base md:text-lg text-muted-foreground">{t.about.missionText}</p>
          </CardContent>
        </Card>

        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 gap-10 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Landmark className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline font-bold">{t.about.historyTitle}</h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground">{t.about.historyText}</p>
            </div>
          </div>
        </div>
        
        {!isClient && (
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-72 mx-auto" />
            </div>
             <Skeleton className="h-96 w-full" />
          </div>
        )}

        {isClient && (isMi || (!isMi && !isSt)) && (
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.about.miSpecializationsTitle}</h2>
            </div>
             <LogoLoop logos={miSpecializationLogos} speed={50} fadeOut={true} />
          </div>
        )}
        
        {isClient && (isSt || (!isMi && !isSt)) && (
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.about.stSpecializationsTitle}</h2>
            </div>
             <LogoLoop logos={stSpecializationLogos} speed={50} fadeOut={true} />
          </div>
        )}
      </div>
    </>
  );
}

export default function AboutPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Skeleton className="w-full h-full" /></div>}>
            <AboutPageContent />
        </Suspense>
    );
}

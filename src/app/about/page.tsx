
"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Landmark, BrainCircuit, ShieldCheck, Atom, Wind, Settings, BatteryCharging, Network, Factory, Wrench, Cpu, Bot, Component, Package, Train, Cog, Droplets, FlaskConical, TrainFront } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSearchParams } from "next/navigation";
import LogoLoop from "@/components/ui/logo-loop";

export default function AboutPage() {
  const { t } = useLanguage();
  const historyImage = PlaceHolderImages.find(p => p.id === 'about-history');
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Target className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-headline">{t.about.missionTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pl-0 md:pt-6">
              <p className="text-base md:text-lg text-muted-foreground">{t.about.missionText}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Eye className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-headline">{t.about.visionTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pl-0 md:pt-6">
              <p className="text-base md:text-lg text-muted-foreground">{t.about.visionText}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Landmark className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline font-bold">{t.about.historyTitle}</h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground">{t.about.historyText}</p>
            </div>
            {historyImage && (
              <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden shadow-xl">
                 <Image
                   src={historyImage.imageUrl}
                   alt={historyImage.description}
                   data-ai-hint={historyImage.imageHint}
                   fill
                   className="object-cover"
                 />
              </div>
            )}
          </div>
        </div>
        
        {(isMi || (!isMi && !isSt)) && (
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.about.miSpecializationsTitle}</h2>
            </div>
             <LogoLoop logos={miSpecializationLogos} speed={50} fadeOut={true} />
          </div>
        )}
        {(isSt || (!isMi && !isSt)) && (
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

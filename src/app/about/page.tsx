"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Landmark } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const { t } = useLanguage();
  const historyImage = PlaceHolderImages.find(p => p.id === 'about-history');

  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto text-center py-16 md:py-24 px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-secondary-foreground">
            {t.about.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </div>
      <div className="container mx-auto py-16 md:py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Target className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-headline">{t.about.missionTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pl-0">
              <p className="text-lg text-muted-foreground">{t.about.missionText}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Eye className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-headline">{t.about.visionTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pl-0">
              <p className="text-lg text-muted-foreground">{t.about.visionText}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Landmark className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-headline font-bold">{t.about.historyTitle}</h2>
              </div>
              <p className="text-lg text-muted-foreground">{t.about.historyText}</p>
            </div>
            {historyImage && (
              <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-xl">
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
      </div>
    </>
  );
}

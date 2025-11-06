
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, Smartphone, FastForward, Target, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DevHubPage() {
  const { t } = useLanguage();

  const devTips = [
    {
      icon: Target,
      title: "1. Define Purpose First",
      description: "Know why you're building the site before anything else."
    },
    {
      icon: Milestone,
      title: "2. Keep It Simple",
      description: "A clean layout and easy navigation make the best first impression."
    },
    {
      icon: Smartphone,
      title: "3. Make It Mobile-Friendly",
      description: "Most visitors will be on their phones, so design for mobile first."
    },
    {
      icon: FastForward,
      title: "4. Prioritize Speed and Clarity",
      description: "Optimize images, limit heavy scripts, and use caching to ensure your site is fast."
    },
    {
      icon: Bot,
      title: "5. Leverage AI Tools",
      description: "Use AI design assistants for layouts and to find solutions for bugs and problems you encounter."
    }
  ];

  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto text-center py-12 md:py-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-secondary-foreground">
            {t.nav.devHub}
          </h1>
          <p className="mt-4 text-base md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Your journey into web development starts here.
          </p>
        </div>
      </div>
      <div className="container mx-auto py-12 md:py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devTips.map((tip, index) => (
                <Card 
                  key={tip.title} 
                  className={cn(
                    "text-center border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-lg h-full",
                    devTips.length === 5 && index >= 3 && "lg:col-start-auto lg:mx-auto"
                  )}
                >
                    <CardHeader>
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-primary/10 text-primary p-4 rounded-full">
                                <tip.icon className="h-8 w-8" />
                            </div>
                        </div>
                        <CardTitle className="text-lg font-headline">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">{tip.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </>
  );
}

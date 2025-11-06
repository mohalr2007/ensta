
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, LayoutTemplate, Palette, Rocket } from "lucide-react";

export default function DevHubPage() {
  const { t } = useLanguage();

  const devTips = [
    {
      icon: LayoutTemplate,
      title: "1. Plan Your Structure (HTML)",
      description: "Start with a solid foundation. Use semantic HTML5 tags like <header>, <main>, <section>, and <footer> to organize your content logically. This is crucial for both SEO and accessibility."
    },
    {
      icon: Palette,
      title: "2. Style with Purpose (CSS)",
      description: "Use CSS for all visual styling. Frameworks like Tailwind CSS are great for rapid development. Focus on creating a consistent theme with a clear color palette, spacing, and typography."
    },
    {
      icon: Code,
      title: "3. Add Interactivity (JavaScript)",
      description: "Bring your site to life with JavaScript. Handle user events, make API calls, and manipulate the DOM. Libraries like React (with Next.js) make building complex user interfaces much more manageable."
    },
    {
      icon: Rocket,
      title: "4. Deploy and Share",
      description: "Once you're ready, deploy your site to a platform like Firebase App Hosting or Vercel. This will make your project live on the internet for everyone to see. Don't forget to buy a domain name!"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {devTips.map((tip) => (
                <Card key={tip.title} className="text-center border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-lg">
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

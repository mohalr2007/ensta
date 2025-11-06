
'use client';

import { Calculator, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/toaster';

export default function SpecialitySelectionPage() {
  const { t } = useLanguage();
  const specialities = [
    {
      name: 'Mathématiques et Informatique',
      shortName: 'MI',
      icon: Calculator,
      href: '/home?speciality=mi',
      description: 'Explore the world of algorithms, data structures, and advanced mathematics.',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-50',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      name: 'Sciences et Technologies',
      shortName: 'ST',
      icon: FlaskConical,
      href: '/home?speciality=st',
      description: 'Dive into physics, chemistry, engineering, and cutting-edge technologies.',
      bgColor: 'bg-green-500',
      textColor: 'text-green-50',
      hoverColor: 'hover:bg-green-600',
    },
  ];

  const logoImage = PlaceHolderImages.find(p => p.id === 'logo');

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <div className="text-center mb-10 sm:mb-12 flex flex-col items-center">
          {logoImage && (
              <Image
                  src={logoImage.imageUrl}
                  alt={logoImage.description}
                  width={80}
                  height={80}
                  className="mb-6 rounded-full shadow-lg transition-transform duration-700 ease-in-out hover:rotate-[360deg] hover:scale-125"
              />
          )}
          <h1 className="text-4xl sm:text-5xl font-bold font-headline mb-3">
            {t.specialitySelection.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.specialitySelection.subtitle}
          </p>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {t.specialitySelection.selectPrompt}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
          {specialities.map((spec) => (
            <Link href={spec.href} key={spec.name}>
              <div 
                  className={`group rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${spec.bgColor} ${spec.textColor} ${spec.hoverColor} flex flex-col justify-between h-full p-6 sm:p-8`}
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <spec.icon className="w-10 h-10 sm:w-12 sm:h-12" />
                      <h2 className="text-2xl sm:text-3xl font-bold font-headline">{spec.name}</h2>
                    </div>
                    <p className="text-base sm:text-lg opacity-90">{spec.description}</p>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-semibold">Enter Portal</span>
                        <span className="text-2xl sm:text-3xl font-bold opacity-50 transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                    </div>
                  </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center text-muted-foreground">
          <p>&copy; 2025 ENSTA. All rights reserved.</p>
        </div>
      </div>
      <Toaster />
    </>
  );
}

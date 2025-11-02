
'use client';

import { Calculator, FlaskConical } from 'lucide-react';
import Link from 'next/link';

export default function SpecialitySelectionPage() {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-3">
          Welcome to ENSTA
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Please select your specialization to enter the student portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {specialities.map((spec) => (
          <Link href={spec.href} key={spec.name}>
             <div className={`group rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${spec.bgColor} ${spec.textColor} flex flex-col justify-between h-full`}>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <spec.icon className="w-12 h-12" />
                    <h2 className="text-3xl font-bold font-headline">{spec.name}</h2>
                  </div>
                  <p className="text-lg opacity-90">{spec.description}</p>
                </div>
                <div className="px-8 py-4 bg-black bg-opacity-20">
                  <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Enter Portal</span>
                      <span className="text-3xl font-bold opacity-50 transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                  </div>
                </div>
             </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center text-muted-foreground">
        <p>&copy; 2024 ENSTA. All rights reserved.</p>
      </div>
    </div>
  );
}

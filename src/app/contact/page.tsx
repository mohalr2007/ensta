
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-secondary/10">
        <div className="container mx-auto text-center py-16 md:py-24 px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16 md:py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
               <Link href={t.contact.addressUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <MapPin className="w-6 h-6" />
               </Link>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.addressTitle}</h3>
                <Link href={t.contact.addressUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.contact.address}
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <Link href={`tel:${t.contact.phones[0]}`} className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <Phone className="w-6 h-6" />
                </Link>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.phoneTitle}</h3>
                {t.contact.phones.map((phone, index) => (
                  <a key={index} href={`tel:${phone}`} className="block text-muted-foreground hover:text-primary transition-colors">{phone}</a>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Link href={`mailto:${t.contact.email}`} className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <Mail className="w-6 h-6" />
              </Link>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.emailTitle}</h3>
                <a href={`mailto:${t.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">{t.contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

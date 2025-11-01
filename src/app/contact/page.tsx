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
               <Link href={t.contact.addressUrl} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground rounded-full p-3 mt-1 inline-block">
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
              <div className="bg-primary text-primary-foreground rounded-full p-3 mt-1">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.phoneTitle}</h3>
                {t.contact.phones.map((phone, index) => (
                  <p key={index} className="text-muted-foreground">{phone}</p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3 mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.emailTitle}</h3>
                <p className="text-muted-foreground">{t.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

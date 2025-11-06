
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ContactPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');

  const isSt = speciality === 'st';

  const mapUrl = isSt
    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.2479627091916!2d3.0587414756553097!3d36.78860477225033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb301a7a8063d%3A0x4c8a4c0183459a2!2s%C3%89cole%20nationale%20Sup%C3%A9rieure%20de%20technologie%20avanc%C3%A9e!5e0!3m2!1sfr!2sdz!4v1762110639738!5m2!1sfr!2sdz"
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.7628605838518!2d3.256288575654727!3d36.77625597225385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e457e206a4adf%3A0x2dedffeaea98475f!2sNational%20Higher%20School%20of%20Advanced%20Technologies!5e0!3m2!1sfr!2sdz!4v1762009406950!5m2!1sfr!2sdz";

  const address = isSt ? t.contact.address_st : t.contact.address_mi;
  const addressUrl = isSt ? t.contact.addressUrl_st : t.contact.addressUrl_mi;

  return (
    <>
      <div className="bg-secondary/10">
        <div className="container mx-auto text-center py-12 md:py-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-foreground">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 md:py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center">
             <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">{t.contact.form.title}</h2>
             <p className="text-muted-foreground mb-8">
                To ensure your message is delivered, please use our simplified contact form.
             </p>
             <Button asChild size="lg">
                <Link href={`/contact/simple${speciality ? `?speciality=${speciality}`: ''}`}>
                    Go to Contact Form
                </Link>
             </Button>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-72">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex items-start gap-4">
               <Link href={addressUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
               </Link>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.addressTitle}</h3>
                <Link href={addressUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                  {address}
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <a href={`tel:${t.contact.phones[0]}`} className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.phoneTitle}</h3>
                {t.contact.phones.map((phone, index) => (
                  <a key={index} href={`tel:${phone}`} className="block text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">{phone}</a>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <a href={`mailto:${t.contact.email}`} className="mt-1 flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <div>
                <h3 className="font-semibold text-lg">{t.contact.emailTitle}</h3>
                <a href={`mailto:${t.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">{t.contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Skeleton className="w-full h-full" /></div>}>
            <ContactPageContent />
        </Suspense>
    );
}

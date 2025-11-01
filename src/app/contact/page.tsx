"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactDetails = [
    { icon: MapPin, title: t.contact.addressTitle, value: t.contact.address },
    { icon: Phone, title: t.contact.phoneTitle, value: t.contact.phone },
    { icon: Mail, title: t.contact.emailTitle, value: t.contact.email },
  ];

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
            {contactDetails.map((detail, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mt-1">
                  <detail.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{detail.title}</h3>
                  <p className="text-muted-foreground">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 md:mt-24">
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2929737877233!2d-122.41941548468155!3d37.77492957975871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a8525b39%3A0x7c81ef1b0c036a4!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1628000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
      </div>
    </>
  );
}

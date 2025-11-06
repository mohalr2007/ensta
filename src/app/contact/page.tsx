
"use client";

import React, { useState, FormEvent, Suspense, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { sendEmail } from '@/lib/actions/send-email';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ContactPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const speciality = searchParams.get('speciality');
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await sendEmail(formData);

      if (result.success) {
        toast({
          title: t.contact.form.successTitle,
          description: t.contact.form.successDescription,
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast({
          variant: "destructive",
          title: t.contact.form.errorTitle,
          description: result.message || t.contact.form.errorDescription,
        });
      }
    });
  }
  
  const isMi = speciality === 'mi';
  const isSt = speciality === 'st';
  const noSpeciality = !isMi && !isSt;


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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
             {(isSt || noSpeciality) && (
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-headline">{t.contact.addressTitle}</CardTitle>
                      <CardDescription>Campus ST (Bab El Oued)</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden border mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.247961551969!2d3.0613164000000004!3d36.78860480000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb301a7a8063d%3A0x4c8a4c0183459a2!2s%C3%89cole%20nationale%20Sup%C3%A9rieure%20de%20technologie%20avanc%C3%A9e!5e0!3m2!1sfr!2sdz!4v1762470127419!5m2!1sfr!2sdz" 
                      width="100%" 
                      height="200" 
                      style={{border:0}} 
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                  <Link href={t.contact.addressUrl_st} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline hover:text-primary">
                    {t.contact.address_st}
                  </Link>
                </CardContent>
              </Card>
            )}

            {(isMi || noSpeciality) && (
               <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-headline">{t.contact.addressTitle}</CardTitle>
                      <CardDescription>Campus MI (Dergana)</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden border mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.7628594271096!2d3.2588635000000004!3d36.776256000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e457e206a4adf%3A0x2dedffeaea98475f!2sNational%20Higher%20School%20of%20Advanced%20Technologies!5e0!3m2!1sfr!2sdz!4v1762470240518!5m2!1sfr!2sdz"
                      width="100%" 
                      height="200" 
                      style={{border:0}} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                  <Link href={t.contact.addressUrl_mi} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline hover:text-primary">
                    {t.contact.address_mi}
                  </Link>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                <CardTitle className="text-xl font-headline">{t.contact.phoneTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                {t.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="block text-muted-foreground hover:underline hover:text-primary">{phone}</a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                <CardTitle className="text-xl font-headline">{t.contact.emailTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`mailto:${t.contact.email}`} className="text-muted-foreground hover:underline hover:text-primary">{t.contact.email}</a>
              </CardContent>
            </Card>
          </div>

          <div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm border">
                  <h3 className="text-2xl font-bold font-headline mb-6">{t.contact.form.title}</h3>
                  {speciality && (
                    <div className="flex items-center gap-2">
                      <Label>{t.contact.form.specialization}</Label>
                      <Badge variant="secondary" className="uppercase text-base">{speciality}</Badge>
                      <input type="hidden" name="speciality" value={speciality} />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                          <Label htmlFor="name">{t.contact.form.name}</Label>
                          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.contact.form.namePlaceholder} required />
                      </div>
                      <div>
                          <Label htmlFor="email">{t.contact.form.email}</Label>
                          <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.contact.form.emailPlaceholder} required />
                      </div>
                  </div>
                  <div>
                      <Label htmlFor="subject">{t.contact.form.subject}</Label>
                      <Input id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t.contact.form.subjectPlaceholder} required />
                  </div>
                  <div>
                      <Label htmlFor="message">{t.contact.form.message}</Label>
                      <Textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.form.messagePlaceholder} required className="min-h-[150px]" />
                  </div>
                  <Button type="submit" size="lg" disabled={isPending} className="w-full">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      t.contact.form.submit
                    )}
                  </Button>
              </form>
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

    
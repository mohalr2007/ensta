
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
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? "Envoi en cours..." : t.contact.form.submit}
                </Button>
            </form>
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

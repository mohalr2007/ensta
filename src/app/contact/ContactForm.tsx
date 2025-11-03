
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge";

export function ContactForm({ speciality }: { speciality: string | null }) {
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = z.object({
    name: z.string().min(2, { message: t.contact.form.validation.name }),
    email: z.string().email({ message: t.contact.form.validation.email }),
    subject: z.string().min(5, { message: t.contact.form.validation.subject }),
    message: z.string().min(10, { message: t.contact.form.validation.message }),
    speciality: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      speciality: speciality || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (!scriptURL) {
      console.error("Google Sheet URL is not defined in environment variables.");
      toast({
        variant: "destructive",
        title: t.contact.form.errorTitle,
        description: "The form is not configured. Please contact support.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('subject', values.subject);
      formData.append('message', values.message);
      formData.append('speciality', values.speciality || 'N/A');

      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      toast({
        title: t.contact.form.successTitle,
        description: t.contact.form.successDescription,
      });
      form.reset();
      form.setValue('speciality', speciality || '');

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: t.contact.form.errorTitle,
        description: t.contact.form.errorDescription,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {speciality && (
          <div className="flex items-center gap-2">
            <FormLabel>{t.contact.form.specialization}</FormLabel>
            <Badge variant="secondary" className="uppercase text-base">{speciality}</Badge>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.form.name}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contact.form.namePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contact.form.email}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contact.form.emailPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.form.subject}</FormLabel>
              <FormControl>
                <Input placeholder={t.contact.form.subjectPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.form.message}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.contact.form.messagePlaceholder}
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </Item>
          )}
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : t.contact.form.submit}
        </Button>
      </form>
    </Form>
  );
}

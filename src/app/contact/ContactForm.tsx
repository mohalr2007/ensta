
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

  const translatedFormSchema = z.object({
    name: z.string().min(2, { message: t.contact.form.validation.name }),
    email: z.string().email({ message: t.contact.form.validation.email }),
    subject: z.string().min(5, { message: t.contact.form.validation.subject }),
    message: z.string().min(10, { message: t.contact.form.validation.message }),
    speciality: z.string().optional(),
  });

  const form = useForm<z.infer<typeof translatedFormSchema>>({
    resolver: zodResolver(translatedFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      speciality: speciality || "N/A",
    },
  });

  async function onSubmit(values: z.infer<typeof translatedFormSchema>) {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (!scriptUrl) {
      console.error("Google Sheet URL is not defined in environment variables.");
      toast({
        variant: "destructive",
        title: t.contact.form.errorTitle,
        description: "Server configuration error: Google Sheet URL is missing.",
      });
      return;
    }

    // Create a new FormData object to send the data like a simple HTML form
    const formData = new FormData();
    formData.append('timestamp', new Date().toISOString());
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('subject', values.subject);
    formData.append('message', values.message);
    formData.append('speciality', values.speciality || 'N/A');

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
        // We remove 'no-cors' to be able to read the response from the script
      });

      const result = await response.json();

      if (result.result === 'success') {
        toast({
          title: t.contact.form.successTitle,
          description: t.contact.form.successDescription,
        });
        form.reset();
        form.setValue('speciality', speciality || 'N/A');
      } else {
        throw new Error(result.error || 'The script reported an error.');
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: t.contact.form.errorTitle,
        description: (error as Error).message || t.contact.form.errorDescription,
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
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : t.contact.form.submit}
        </Button>
      </form>
    </Form>
  );
}

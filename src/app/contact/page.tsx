import ContactClient from "./ContactClient";
import { contactCopy } from "@/lib/contact-copy";
import { getLocale } from "@/lib/landing-copy";
import { createPageMetadata } from "@/lib/site";

interface ContactPageProps {
  searchParams: Promise<{ lang?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: ContactPageProps) {
  const locale = getLocale((await searchParams).lang);
  return createPageMetadata("/contact", locale, contactCopy[locale].metadata);
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const locale = getLocale((await searchParams).lang);
  return <ContactClient locale={locale} />;
}

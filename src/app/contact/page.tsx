import DynamicHero from "@/components/common/dynamic-hero";
import ContactForm from "@/components/contact/contact-form";
import WhatHappensNext from "@/components/contact/what-happens-next";
import CtaSection from "@/components/common/cta-section";

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col">
      <DynamicHero
        badgeText="GET IN TOUCH"
        title="Contact Us"
        description="Ready to transform your property? Get in touch to discuss your furnishing needs and timeline."
      />
      <ContactForm />
      <WhatHappensNext />
      <CtaSection
        badgeText="SKIP THE FORM"
        title="Prefer to Book Directly?"
        description="Schedule a consultation call to discuss your project in detail."
      />
    </main>
  );
}

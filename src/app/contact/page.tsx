import DynamicHero from "@/components/common/dynamic-hero";
import ContactForm from "@/components/contact/contact-form";

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col">
      <DynamicHero
        badgeText="GET IN TOUCH"
        title="Contact Us"
        description="Ready to transform your property? Get in touch to discuss your furnishing needs and timeline."
      />
      <ContactForm />
    </main>
  );
}

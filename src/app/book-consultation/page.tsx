import BookConsultationHero from "@/components/book-consultation/book-consultation-hero";
import ConsultationForm from "@/components/book-consultation/consultation-form";
import CTA from "@/components/common/cta";

export default function BookConsultation() {
  return (
    <main className="min-h-screen">
      <BookConsultationHero />
      <ConsultationForm />
      <CTA />
    </main>
  );
}

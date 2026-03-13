import BookConsultationHero from "@/components/book-consultation/book-consultation-hero";
import ConsultationForm from "@/components/book-consultation/consultation-form";
import Journey from "@/components/book-consultation/journey";
import CTA from "@/components/common/cta";
import Testimonial from "@/components/common/testimonial";

export default function BookConsultation() {

  return (
    <main className="min-h-screen">
      <BookConsultationHero />
      <ConsultationForm />
      <Journey />
      <Testimonial />
      <CTA />
    </main>
  );
}

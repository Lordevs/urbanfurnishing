import Image from "next/image";
import { ArrowRight, Component } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center py-20 mb-20">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cta.webp"
          alt="Call to action background"
          fill
          className="object-cover object-center"
          quality={100}
        />
        {/* Optional overlay to darken the background slightly if needed */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
      </div>

      {/* Glassmorphism Container */}
      <div className="relative z-10 w-[90%] max-w-4xl mx-auto flex flex-col items-center justify-center px-6 py-20 border border-white/20 bg-white/10 backdrop-blur-sm text-white text-center">
        {/* Top Badge */}
        <div className="mb-6 inline-flex items-center gap-3 border border-white/30 px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light">
          <Component className="w-3 h-3" />
          <span>Start Your Project</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 font-light">
          Ready to Get Started?
        </h2>

        {/* Short Line */}
        <div className="w-16 h-px bg-white/50 mb-8"></div>

        {/* Subtitle */}
        <p className="font-light text-sm md:text-base text-gray-100 max-w-lg mx-auto mb-10 tracking-wide">
          Book a consultation to discuss your property and furnishing needs
        </p>

        {/* Button */}
        <Button
          variant="outline"
          className="bg-white cursor-pointer w-60  text-black border-none hover:bg-gray-100 hover:text-black rounded-none px-20 py-5 h-auto text-sm tracking-wide">
          Book Consultation <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}

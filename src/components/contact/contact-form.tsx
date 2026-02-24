"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactDetails = [
  {
    icon: Mail,
    title: "EMAIL",
    content: "hello@uhfurnishing.ae",
  },
  {
    icon: Phone,
    title: "PHONE",
    content: "+971 XX XXX XXXX",
  },
  {
    icon: MapPin,
    title: "LOCATION",
    content: "Dubai, United Arab Emirates",
  },
  {
    icon: Clock,
    title: "WORKING HOURS",
    content: "Sun - Thu: 9:00 AM - 6:00 PM",
  },
];

const ContactForm = () => {
  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        {/* Left Column: Information */}
        <div className="flex flex-col space-y-10 lg:pr-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ebe6df] border border-[#e0d9d0] text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#9A8C7A] uppercase font-sans">
              <span className="w-1 h-1 rounded-full bg-[#827159]" />
              CONTACT INFORMATION
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif text-[#6b6256] font-light leading-tight">
              Let&apos;s Start a Conversation
            </h2>

            <p className="text-[15px] md:text-[16px] max-w-[500px] leading-relaxed text-[#9a8c7a] font-light">
              Whether you&apos;re an investor, homeowner, or developer,
              we&apos;re here to help you create spaces that deliver results.
            </p>
          </motion.div>

          {/* Contact Details List */}
          <div className="flex flex-col space-y-3">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="w-full bg-white/30 py-5 px-6 flex items-center gap-6 border border-[#e8e4db]">
                <div className="w-10 h-10 rounded-full border border-[#d2cab9] flex items-center justify-center shrink-0 bg-white/50">
                  <detail.icon
                    className="w-4 h-4 text-[#8e8578]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                    {detail.title}
                  </span>
                  <span className="text-[14px] md:text-[15px] text-[#5D4E3C] font-light">
                    {detail.content}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full aspect-video lg:h-full lg:min-h-[250px] overflow-hidden mt-6">
            <Image
              src="/contact/contact-form.webp"
              alt="Dubai Skyline"
              fill
              className="object-cover"
              quality={90}
            />
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f6f4f0] border border-[#e8e4db] text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#9A8C7A] uppercase font-sans">
              <Send className="w-3 h-3 text-[#9A8C7A]" />
              SEND MESSAGE
            </div>

            <h3 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[40px] font-serif text-[#6b6256] font-light">
              Quick Inquiry
            </h3>

            {/* Separator Line */}
            <div className="w-16 h-px bg-[#8e8578] opacity-60 mt-4 mb-8" />

            <form className="space-y-6 pt-2">
              <div className="space-y-2.5">
                <Label className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                  Full Name *
                </Label>
                <Input
                  placeholder="Your full name"
                  className="bg-[#FCFBF9] border-[#e8e4db] h-12 text-[#5D4E3C] rounded-none focus-visible:ring-1 focus-visible:ring-[#8e8578] font-light placeholder:text-[#b0a79a]"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                  Email Address *
                </Label>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  className="bg-[#FCFBF9] border-[#e8e4db] h-12 text-[#5D4E3C] rounded-none focus-visible:ring-1 focus-visible:ring-[#8e8578] font-light placeholder:text-[#b0a79a]"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                  Phone Number
                </Label>
                <Input
                  placeholder="+971 XX XXX XXXX"
                  type="tel"
                  className="bg-[#FCFBF9] border-[#e8e4db] h-12 text-[#5D4E3C] rounded-none focus-visible:ring-1 focus-visible:ring-[#8e8578] font-light placeholder:text-[#b0a79a]"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                  Property Type
                </Label>
                <Input className="bg-[#FCFBF9] border-[#e8e4db] h-12 text-[#5D4E3C] rounded-none focus-visible:ring-1 focus-visible:ring-[#8e8578] font-light" />
              </div>

              <div className="space-y-2.5">
                <Label className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#9A8C7A] uppercase">
                  Message *
                </Label>
                <Textarea
                  placeholder="Tell us about your project..."
                  className="bg-[#FCFBF9] border-[#e8e4db] min-h-[140px] text-[#5D4E3C] rounded-none focus-visible:ring-1 focus-visible:ring-[#8e8578] font-light placeholder:text-[#b0a79a] resize-none"
                />
              </div>

              <Button
                type="button"
                className="w-full bg-[#5D4E3C] hover:bg-[#4a3e2f] text-white rounded-none h-[54px] mt-6 tracking-wide text-[13px] font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                Send Message <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;

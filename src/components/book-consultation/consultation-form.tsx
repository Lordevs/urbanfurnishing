"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const propertyTypes = ["Studio", "1 BR", "2 BR", "3 BR+"];
const contactMethods = ["Phone Call", "Email", "WhatsApp"];

export default function ConsultationForm() {
  const [propertyType, setPropertyType] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("");

  return (
    <section className="py-24 bg-card">
      <div className="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Book <span className="text-[#C9A76A] font-serif">Free</span>{" "}
            Consultation
          </h2>
          <p className="text-[#8F877C] text-base sm:text-lg font-light tracking-wide">
            Book free Consultation and get the guide
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-8xl mx-auto items-start">
          {/* Left Sidebar */}
          <div className="lg:w-[35%] w-full self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-10 rounded-[32px] shadow-lg w-full"
              style={{
                background:
                  "linear-gradient(135deg, #2A1F15 0%, #412A1F 45%, #5D4E3C 100%)",
              }}>
              <div className="inline-flex items-center justify-center border border-white/20 bg-white/10 rounded-full px-4 py-1.5 mb-8">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#E0Dcd8] uppercase">
                  CONTACT DETAILS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                Get In Touch
              </h3>
              <p className="text-[#E0Dcd8]/80 text-[13px] font-light mb-10 tracking-wide">
                We&apos;re here to help bring your vision to life
              </p>

              <div className="flex flex-col gap-5">
                {/* Contact Items */}
                <div className="flex items-center gap-4 bg-white/25 p-4 sm:p-5 rounded-[16px]">
                  <div className="w-10 h-10 rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-[11px] font-light mb-0.5">
                      Call Us
                    </span>
                    <span className="text-white text-[13px] font-medium tracking-wide">
                      +971 50 123 4567
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/25 p-4 sm:p-5 rounded-[16px]">
                  <div className="w-10 h-10 rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-[11px] font-light mb-0.5">
                      Email
                    </span>
                    <span className="text-white text-[13px] font-medium tracking-wide">
                      info@uhfurnishing.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/25 p-4 sm:p-5 rounded-[16px]">
                  <div className="w-10 h-10 rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-[11px] font-light mb-0.5">
                      Office
                    </span>
                    <span className="text-white text-[13px] font-medium tracking-wide">
                      Dubai, UAE
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/25 p-4 sm:p-5 rounded-[16px]">
                  <div className="w-10 h-10 rounded-full bg-[#C9A76A] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-[11px] font-light mb-0.5">
                      Hours
                    </span>
                    <span className="text-white text-[13px] font-medium tracking-wide">
                      Sun - Thu: 9AM - 6PM
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="lg:w-[65%] w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 sm:p-12 lg:p-14 rounded-[32px] shadow-sm border border-[#F0EBE6]">
              <div className="inline-flex items-center justify-center border border-[#EAEADF] bg-[#FCFAF8] rounded-full px-4 py-1.5 mb-6">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#C9A76A] uppercase">
                  CONSULTATION FORM
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-medium text-[#1a1a1a] mb-4 tracking-tight">
                Let&apos;s Start Your{" "}
                <span className="text-[#C9A76A] font-serif">Journey</span>
              </h3>
              <p className="text-[#8F877C] text-[13px] sm:text-[14px] font-light mb-12 tracking-wide">
                Fill in the details below and we&apos;ll get back to you within 24
                hours to schedule your consultation.
              </p>

              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      First Name <span className="text-[#C9A76A]">*</span>
                    </label>
                    <Input
                      placeholder="John"
                      className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px]"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Last Name <span className="text-[#C9A76A]">*</span>
                    </label>
                    <Input
                      placeholder="Doe"
                      className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Email Address <span className="text-[#C9A76A]">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px]"
                    />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Phone Number <span className="text-[#C9A76A]">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Package Interest */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Package Interest <span className="text-[#C9A76A]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        defaultValue=""
                        className="appearance-none w-full cursor-pointer bg-[#FFF8F0] border border-[#E8E1DA] text-[#412A1F] h-[50px] text-[13px] font-light rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#C9A76A]/30 transition-all">
                        <option value="" disabled>
                          Select a package
                        </option>
                        <option value="investor">Investor Turnkey</option>
                        <option value="end-user">End-User Signature</option>
                        <option value="developer">Developer Solutions</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-[#8F877C]">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Project Timeline */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                      Project Timeline
                    </label>
                    <div className="relative">
                      <select
                        defaultValue=""
                        className="appearance-none w-full cursor-pointer bg-[#FFF8F0] border border-[#E8E1DA] text-[#412A1F] h-[50px] text-[13px] font-light rounded-[8px] px-3 focus:outline-none focus:ring-1 focus:ring-[#C9A76A]/30 transition-all">
                        <option value="" disabled>
                          Select timeline
                        </option>
                        <option value="immediately">Immediately</option>
                        <option value="1-3-months">1-3 Months</option>
                        <option value="3-6-months">3-6 Months</option>
                        <option value="6-plus-months">6+ Months</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-[#8F877C]">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="flex flex-col gap-3 mt-2">
                  <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`flex-1 min-w-[100px] h-[50px] rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                          propertyType === type
                            ? "bg-[#C9A76A]/5 border border-[#C9A76A] text-[#412A1F]"
                            : "bg-[#FFF8F0] border border-[#E8E1DA] text-[#8F877C] hover:border-[#C9A76A]/50"
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details Box */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                    Tell Us About Your Project
                  </label>
                  <Textarea
                    placeholder="Share details about your property, design preferences, budget range, or any specific requirements..."
                    className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 min-h-[120px] text-[13px] font-light rounded-[8px] resize-y p-4 placeholder:text-[#8F877C]/70"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div className="flex flex-col gap-3 mt-2">
                  <label className="text-[12px] text-[#412A1F] font-medium tracking-wide">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {contactMethods.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setContactMethod(method)}
                        className={`flex-1 min-w-[120px] h-[50px] rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                          contactMethod === method
                            ? "bg-[#C9A76A]/5 border border-[#C9A76A] text-[#412A1F]"
                            : "bg-[#FFF8F0] border border-[#E8E1DA] text-[#8F877C] hover:border-[#C9A76A]/50"
                        }`}>
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agreement */}
                <div className="bg-[#FFF8F0] border border-[#E8E1DA] rounded-[8px] p-4 mt-2">
                  <p className="text-[#8F877C] text-[11px] leading-relaxed font-light">
                    I agree to receive communications from UH Furnishing
                    regarding my consultation request. I understand that my
                    information will be kept confidential and I can unsubscribe
                    at any time.
                  </p>
                </div>

                {/* Submit Button */}
                <Button className="group w-full rounded-full cursor-pointer bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] flex items-center justify-between gap-4 py-2 pr-2 pl-8 h-[56px] text-[14px] font-medium transition-all duration-300 shadow-md border-none mt-4">
                  <span className="flex-1 text-center pr-4">
                    Book Free Consultation
                  </span>
                  <div className="bg-[#FDF4E7] rounded-full p-2.5 text-[#3D261C] transition-transform duration-300 group-hover:scale-95 shrink-0">
                    <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px stroke-[1.5]" />
                  </div>
                </Button>

                {/* Secure Lock Text */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Lock className="w-3 h-3 text-[#C9A76A]" />
                  <span className="text-[#8F877C] text-[11px] font-light tracking-wide">
                    Your information is secure and will never be shared
                  </span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

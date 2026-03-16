"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    number: "01",
    title: "Discovery call",
    description:
      "Elena learns about your space, lifestyle and aesthetic in a 30-min video call.",
  },
  {
    number: "02",
    title: "Layout & mood board",
    description:
      "Room layout, style direction, and mood board delivered within 5 working days.",
  },
  {
    number: "03",
    title: "Furniture selection",
    description:
      "Every piece handpicked, priced, and presented for approval before ordering.",
  },
  {
    number: "04",
    title: "Delivery & setup",
    description:
      "We handle delivery, placement, and final styling. Walk in to a finished home.",
  },
];

const rooms = [
  "Living room",
  "Master bedroom",
  "Additional bedrooms",
  "Dining area",
  "Home office",
];

const INPUT_CLASS =
  "bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C9A76A]/30 h-[50px] text-[13px] font-light rounded-[8px] focus:ring-1 focus:ring-[#C9A76A]/30 transition-all w-full";

const LABEL_CLASS = "text-[12px] text-[#412A1F] font-medium tracking-wide";

export default function DesignServiceSession() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const toggleRoom = (room: string) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room],
    );
  };

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-16 mx-auto bg-[#FDFBF9]">
      {/* Section Header */}
      <div className="mb-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A1A1A] mb-3 md:mb-4">
            Design Service by <br />
            <span className="text-[#C4A36B]">Elena</span>
          </h2>
          <p className="text-sm text-[#666666] md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A fully personalised interior design experience — guided by our
            Italian Creative Director from first call to final setup.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Side: How it works & Profile */}
        <div className="flex flex-col gap-12">
          <div>
            <span className="text-[#C4A36B] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 block">
              How it works
            </span>
            <h3 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-4">
              Your home, designed <br />
              <span className="text-[#C4A36B]">around you.</span>
            </h3>
            <p className="text-[#666666] mb-10 leading-relaxed font-light text-xs md:text-base ">
              No templates. No guesswork. Elena works with you one-on-one to
              understand your space, lifestyle, and taste — then delivers a
              complete interior plan.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 text-sm md:text-base rounded-lg border border-[#E8E1D9] flex items-center justify-center shrink-0 text-[#C4A36B] font-serif font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-serif font-bold text-[#1A1A1A] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[#666666] text-xs md:text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Designer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[#F5F1EE] border border-[#E8E1D9] flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#8B6E4E] flex items-center justify-center text-white text-2xl font-serif shrink-0">
              E
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">
                Elena Marchetti
              </h4>
              <p className="text-[#C4A36B] text-xs font-medium mb-2">
                Italian Creative Director
              </p>
              <p className="text-[#666666] text-sm font-light leading-relaxed">
                15 years designing interiors across Milan, Dubai and London.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="lg:-mt-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-[#F0EBE6]"
          >
            <div className="inline-flex items-center justify-center border border-[#EAEADF] bg-[#FCFAF8] rounded-full px-4 py-1.5 mb-6">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-[#C4A36B] uppercase">
                DESIGN CALL FORM
              </span>
            </div>

            <h3 className="text-3xl font-serif font-medium text-[#1A1A1A] mb-4 tracking-tight">
              Book a <span className="text-[#C4A36B]">Design Call</span>
            </h3>
            <p className="text-[#8F877C] text-[14px] font-light mb-10 tracking-wide">
              Fill in the details below and Elena&apos;s team will get back to
              you within 24 hours to schedule your call.
            </p>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName" className={LABEL_CLASS}>
                    First Name <span className="text-[#C9A76A]">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Sarah"
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName" className={LABEL_CLASS}>
                    Last Name <span className="text-[#C9A76A]">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Al Mansouri"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className={LABEL_CLASS}>
                  Email Address <span className="text-[#C9A76A]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah@email.com"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className={LABEL_CLASS}>
                  Phone / WhatsApp <span className="text-[#C9A76A]">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="+971 50 000 0000"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label className={LABEL_CLASS}>Home Size</Label>
                  <Select>
                    <SelectTrigger className={INPUT_CLASS}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1br">1 Bedroom</SelectItem>
                      <SelectItem value="2br">2 Bedrooms</SelectItem>
                      <SelectItem value="3br+">3+ Bedrooms</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className={LABEL_CLASS}>Budget Range</Label>
                  <Select>
                    <SelectTrigger className={INPUT_CLASS}>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget1">
                        AED 5,000 - 15,000
                      </SelectItem>
                      <SelectItem value="budget2">
                        AED 15,000 - 30,000
                      </SelectItem>
                      <SelectItem value="budget3">
                        AED 30,000 - 50,000
                      </SelectItem>
                      <SelectItem value="budget4">AED 50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label className={LABEL_CLASS}>Rooms to Furnish</Label>
                <div className="flex flex-wrap gap-2">
                  {rooms.map((room) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => toggleRoom(room)}
                      className={`px-4 py-2 rounded-[8px] text-[12px] font-medium transition-all cursor-pointer ${
                        selectedRooms.includes(room)
                          ? "bg-[#C4A36B]/5 border border-[#C4A36B] text-[#412A1F]"
                          : "bg-[#FFF8F0] border border-[#E8E1DA] text-[#8F877C] hover:border-[#C4A36B]/50"
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="extra" className={LABEL_CLASS}>
                  Anything else?
                </Label>
                <Textarea
                  id="extra"
                  placeholder="Style preferences, move-in date, specific requests..."
                  className="bg-[#FFF8F0] border-[#E8E1DA] focus-visible:ring-[#C4A36B]/30 min-h-[120px] text-[13px] font-light rounded-[8px] resize-y p-4 placeholder:text-[#8F877C]/70 transition-all"
                />
              </div>

              <Button
                type="submit"
                className="group w-full rounded-full cursor-pointer bg-[#3D261C] hover:bg-[#2C1A11] text-[#F3EFE7] flex items-center justify-between gap-4 py-2 pr-2 pl-8 h-[56px] text-[14px] font-medium transition-all duration-300 shadow-md border-none mt-4"
              >
                <span className="flex-1 text-center pr-4">
                  Request My Design Call
                </span>
                <div className="bg-[#FDF4E7] rounded-full p-2.5 text-[#3D261C] transition-transform duration-300 group-hover:scale-95 shrink-0">
                  <Image
                    src="/common/arrow-up.svg"
                    alt="Arrow Up"
                    width={12}
                    height={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-[#8F877C] text-[11px] font-light tracking-wide">
                  No commitment required. Elena&apos;s team will reach out
                  within 24 hours.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function OrderSummary({ onProceed }: { onProceed?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 lg:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full lg:w-[380px] shrink-0 h-max"
    >
      <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-7">Order Summary</h3>
      
      <div className="flex flex-col gap-5 mb-7">
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#333333]">Subtotal</span>
          <span className="font-semibold text-[#1A1A1A]">₹11,500</span>
        </div>
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#333333]">Shipping</span>
          <span className="font-semibold text-[#1A1A1A]">₹200</span>
        </div>
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-[#333333]">Tax</span>
          <span className="font-semibold text-[#1A1A1A]">₹920</span>
        </div>
      </div>
      
      <div className="w-full h-px bg-[#EBEBEB] mb-7" />
      
      <div className="flex justify-between items-center mb-8">
        <span className="text-[16px] font-medium text-[#1A1A1A]">Total</span>
        <span className="text-[18px] font-bold text-[#1A1A1A]">₹12,620</span>
      </div>
      
      <div className="flex flex-col gap-4">
        <Input 
          placeholder="Enter promo code" 
          className="h-[48px] bg-[#F9F9F9] border-none rounded-[8px] px-4 text-[14px] text-[#1A1A1A] placeholder:text-[#888888] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="outline" className="w-full h-[48px] rounded-[8px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14px] shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform">
          Apply Code
        </Button>
        <Button 
          onClick={onProceed}
          className="w-full h-[52px] mt-2 bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium flex items-center justify-between px-6 transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
          Proceed to Checkout
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
            <ArrowUpRight className="w-4 h-4 stroke-2" />
          </div>
        </Button>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const method = searchParams.get("method");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[500px] w-full bg-white border border-[#EBEBEB] rounded-[24px] p-8 lg:p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-3 font-serif">
          Order Confirmed!
        </h1>
        <p className="text-[#666666] text-[15px] mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>

        <div className="bg-[#F9F9F9] rounded-[16px] p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#888888]">Order Number</span>
            <span className="font-bold text-[#1A1A1A]">#{orderNumber || "UF-827361"}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#888888]">Payment Status</span>
            <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${method === "bank" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
              {method === "bank" ? "Pending Verification" : "Paid Securely"}
            </span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-[#888888]">Est. Delivery</span>
            <span className="font-medium text-[#1A1A1A]">3-5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full h-[52px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[12px] font-medium transition-all shadow-md"
          >
            <Link href={ROUTES.HOME} className="flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full h-[52px] rounded-[12px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              Track Your Order
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-[#F2F2F2] flex items-center justify-center gap-2 text-[13px] text-[#888888]">
          <span>Need help?</span>
          <Link href="/contact" className="text-[#412A1F] font-medium hover:underline flex items-center gap-0.5">
            Contact Support <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#412A1F]" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}

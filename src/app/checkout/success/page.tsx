"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, Loader2 } from "lucide-react";
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
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[500px] w-full bg-card border border-border rounded-[24px] p-8 lg:p-12 text-center shadow-sm"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2
            className="w-10 h-10 text-green-500"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-[28px] font-bold text-foreground mb-3 font-serif">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground text-[15px] mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>

        <div className="bg-muted rounded-[16px] p-6 mb-8 text-left space-y-4 border border-border/50">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-muted-foreground font-medium">
              Order Number
            </span>
            <span className="font-bold text-foreground">
              #{orderNumber || "UF-827361"}
            </span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-muted-foreground font-medium">
              Payment Status
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${method === "bank" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
            >
              {method === "bank" ? "Pending Verification" : "Paid Securely"}
            </span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-muted-foreground font-medium">
              Est. Delivery
            </span>
            <span className="font-bold text-foreground">3-5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="w-full h-[54px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-[14px] font-bold transition-all shadow-md"
          >
            <Link
              href={ROUTES.HOME}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-[13px] font-medium uppercase tracking-widest">
            Need Help?
          </p>
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-1.5 items-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Call Us
              </span>
              <a
                href="tel:+971501234567"
                className="text-[14px] font-bold text-primary hover:text-secondary transition-colors underline decoration-primary/20 underline-offset-4"
              >
                +971 50 123 4567
              </a>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Email
              </span>
              <a
                href="mailto:info@uhfurnishing.ae"
                className="text-[14px] font-bold text-primary hover:text-secondary transition-colors underline decoration-primary/20 underline-offset-4"
              >
                info@uhfurnishing.ae
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#412A1F]" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

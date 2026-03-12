"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

import { OrderTrackingDetails } from "@/components/shared/order-tracking-details";
import { TrackOrderForm } from "@/components/shared/track-order-form";
import { useTrackOrder } from "@/hooks/queries/use-track-order";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("order") || "";
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);

  const { data: order, isLoading, isError } = useTrackOrder(orderNumber);

  const handleSearch = (num: string) => {
    setOrderNumber(num);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-secondary text-[12px] font-bold uppercase tracking-wider mb-4"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Track Your Delivery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[32px] sm:text-[42px] font-serif font-bold text-foreground leading-tight mb-4"
          >
            Track Your Order
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-[15px] sm:text-[16px] max-w-lg mx-auto leading-relaxed"
          >
            Enter your order number below to check the current status of your
            premium furniture delivery.
          </motion.p>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <TrackOrderForm
            onSearch={handleSearch}
            isLoading={isLoading}
            initialValue={orderNumber}
          />
        </div>

        {/* Result States */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-[14px] text-muted-foreground font-medium">
                Fetching your order details...
              </p>
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-100 rounded-[24px] p-8 text-center flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-red-900 mb-1">
                  Order Not Found
                </h3>
                <p className="text-red-700 text-[14px] font-medium">
                  We couldn&apos;t find an order with the number{" "}
                  <span className="font-bold underline">{orderNumber}</span>.
                  Please double-check and try again.
                </p>
              </div>
              <button
                onClick={() => setOrderNumber("")}
                className="mt-2 text-red-700 text-[13px] font-bold hover:underline"
              >
                Clear Search
              </button>
            </motion.div>
          )}

          {order && !isLoading && !isError && (
            <OrderTrackingDetails key="details" order={order} />
          )}

          {!order && !isLoading && !isError && !orderNumber && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 opacity-30 grayscale"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-foreground" />
              </div>
              <p className="text-[14px] text-foreground font-bold">
                Your order details will appear here
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, Clock, Package, Truck, CheckCircle2 } from "lucide-react";

import { type OrderStatus } from "@/types/api";

interface OrderStatusVisualizerProps {
  status: OrderStatus;
}

const STEPS = [
  { id: "PENDING", label: "Placed", icon: Clock },
  { id: "CONFIRMED", label: "Confirmed", icon: Check },
  { id: "PROCESSING", label: "Processing", icon: Package },
  { id: "SHIPPED", label: "In Transit", icon: Truck },
  { id: "DELIVERED", label: "Arrived", icon: CheckCircle2 },
];

export function OrderStatusVisualizer({ status }: OrderStatusVisualizerProps) {
  const isTerminal = status === "CANCELLED" || status === "REFUNDED";
  const currentStepIndex = STEPS.findIndex((s) => s.id === status);
  const displayIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  if (isTerminal) {
    return (
      <div className="w-full py-2">
        {status === "CANCELLED" && (
          <div className="p-6 bg-red-50/50 border border-red-100 rounded-[20px] flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm ring-4 ring-white">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[18px] font-bold text-red-700">
                Order Cancelled
              </h4>
              <p className="text-[14px] text-red-600/80 font-medium max-w-[280px]">
                This order was cancelled on{" "}
                {new Date().toLocaleDateString("en-AE")}. If you have questions,
                please contact our support.
              </p>
            </div>
          </div>
        )}

        {status === "REFUNDED" && (
          <div className="p-6 bg-primary/10 border border-primary/10 rounded-[20px] flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm ring-4 ring-white">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[18px] font-bold text-primary">
                Order Refunded
              </h4>
              <p className="text-[14px] text-primary/80 font-medium max-w-[280px]">
                The full amount has been refunded to your original payment
                method. Please allow 3-5 business days for processing.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between">
        {/* Progress Line Background */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-10" />

        {/* Active Progress Line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary -z-10"
          initial={{ width: 0 }}
          animate={{ width: `${(displayIndex / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= displayIndex;
          const isCurrent = index === displayIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive ? "var(--primary)" : "var(--muted)",
                  scale: isCurrent ? 1.1 : 1,
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                />
              </motion.div>
              <div className="flex flex-col items-center">
                <span
                  className={`text-[12px] font-bold tracking-tight uppercase ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <motion.span
                    layoutId="status-dot"
                    className="w-1.5 h-1.5 rounded-full bg-secondary mt-1"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

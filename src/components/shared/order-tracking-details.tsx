"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
} from "lucide-react";
import Image from "next/image";

import { type OrderDetail } from "@/types/api";

import { OrderStatusVisualizer } from "./order-status-visualizer";

interface OrderTrackingDetailsProps {
  order: OrderDetail;
}

export function OrderTrackingDetails({ order }: OrderTrackingDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Status Card */}
      <div className="bg-card border border-border rounded-[24px] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground text-[13px] font-medium uppercase tracking-wider">
                Order No.
              </span>
              <h2 className="text-foreground text-[20px] font-bold font-serif">
                {order.order_number}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[13px] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(order.created_at)}
              </div>
              {order.updated_at && (
                <div className="flex items-center gap-1.5 text-muted-foreground text-[13px] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Updated: {formatDate(order.updated_at)}
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-2 bg-muted rounded-[10px] text-foreground text-[14px] font-bold uppercase tracking-tight border border-border/50">
            Status: {order.status}
          </div>
        </div>

        <OrderStatusVisualizer status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List (Only if items exist) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {order.items && order.items.length > 0 && (
            <div className="bg-card border border-border rounded-[24px] p-6 lg:p-8 shadow-sm">
              <h3 className="text-[17px] font-bold text-foreground mb-6 flex items-center gap-2">
                Order Items
                <span className="text-[14px] font-normal text-muted-foreground">
                  ({order.items.length})
                </span>
              </h3>

              <div className="flex flex-col gap-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-pointer">
                    <div className="relative w-20 h-20 bg-muted/50 rounded-[16px] overflow-hidden shrink-0 border border-border">
                      <Image
                        src={item.image || "/placeholder-image.webp"}
                        alt={item.item_name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-1">
                      <h4 className="text-[15px] font-bold text-foreground line-clamp-1 group-hover:text-secondary transition-colors">
                        {item.item_name}
                      </h4>
                      <p className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                        {item.item_type} • Qty: {item.quantity}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-[14px] font-bold text-foreground">
                          AED{" "}
                          {(
                            parseFloat(item.unit_discounted_price) || 0
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-3">
                {order.subtotal && (
                  <div className="flex justify-between items-center text-muted-foreground text-[14px] font-medium">
                    <span>Subtotal</span>
                    <span>
                      AED {parseFloat(order.subtotal).toLocaleString()}
                    </span>
                  </div>
                )}
                {order.discount_amount &&
                  parseFloat(order.discount_amount) > 0 && (
                    <div className="flex justify-between items-center text-secondary text-[14px] font-bold">
                      <span>Discount</span>
                      <span>
                        - AED{" "}
                        {parseFloat(order.discount_amount).toLocaleString()}
                      </span>
                    </div>
                  )}
                <div className="flex justify-between items-center text-foreground pt-2 border-t border-border mt-2">
                  <span className="text-[16px] font-bold">Total Amount</span>
                  <span className="text-[20px] font-serif font-bold">
                    AED {parseFloat(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!order.items?.length && (
            <div className="bg-card border border-border rounded-[24px] p-6 lg:p-8 shadow-sm">
              <div className="flex justify-between items-center text-foreground">
                <span className="text-[16px] font-bold">Total Amount</span>
                <span className="text-[20px] font-serif font-bold">
                  AED {parseFloat(order.total_amount).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {order.notes && (
            <div className="bg-card border border-border rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[15px] font-bold text-foreground mb-3">
                Order Notes
              </h3>
              <p className="text-muted-foreground text-[14px] leading-relaxed italic">
                &quot;{order.notes}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-4">
          {order.customer_email && (
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-foreground mb-5">
                Customer Information
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                      Email
                    </span>
                    <p className="text-[14px] font-medium text-foreground break-all">
                      {order.customer_email}
                    </p>
                  </div>
                </div>
                {order.customer_phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                        Phone
                      </span>
                      <p className="text-[14px] font-medium text-foreground">
                        {order.customer_phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {order.shipping_first_name && (
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-foreground mb-5">
                Delivery Address
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-medium text-foreground leading-relaxed">
                    <span className="font-bold">
                    {order.shipping_first_name} {order.shipping_last_name}
                    </span>
                    <br />
                    <span className="text-muted-foreground">
                    {order.shipping_street_address}
                    <br />
                    {order.shipping_apartment_suite && (
                      <>
                        {order.shipping_apartment_suite}
                        <br />
                      </>
                    )}
                    {order.shipping_city}, {order.shipping_state}
                    <br />
                    {order.shipping_country}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {(order.payment || order.payment_status || order.payment_method) && (
            <div className="bg-primary rounded-[24px] p-6 shadow-lg text-primary-foreground">
              <h3 className="text-[16px] font-bold mb-5 flex items-center justify-between">
                Payment Status
                <div className="bg-white/10 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {order.payment_status || order.payment?.status || "Pending"}
                </div>
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shadow-inner ring-1 ring-white/20">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[14px] font-bold">
                    {order.payment?.method === "CARD" ||
                    order.payment_method === "CARD"
                      ? "Online Payment"
                      : order.payment?.method === "CASH_ON_DELIVERY" ||
                          order.payment_method === "CASH_ON_DELIVERY"
                        ? "Cash on Delivery"
                        : "Payment Method"}
                  </p>
                  <p className="text-[12px] opacity-80 font-medium">
                    Currency: {order.payment?.currency || "AED"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </motion.div>
  );
}

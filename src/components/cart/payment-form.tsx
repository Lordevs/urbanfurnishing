import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Lock,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";
import { useConfirmPayment } from "@/hooks/mutations/use-confirm-payment";
import { useCreateOrder } from "@/hooks/mutations/use-create-order";
import type { PromoValidateResponse, OrderPayload } from "@/types/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/**
 * Stripe Payment Component
 * Handles the actual confirmation of the payment intent
 */
function StripeSection({
  orderNumber,
  onSuccess,
}: {
  clientSecret: string;
  orderNumber: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutate: confirmOnBackend } = useConfirmPayment();

  const handleConfirm = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // 1. Confirm with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      // 2. Notify backend to finalize order
      confirmOnBackend(
        {
          orderNumber,
          gateway_payment_id: paymentIntent.id,
        },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (err) => {
            toast.error(err.message || "Order finalization failed");
            setIsProcessing(false);
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border border-[#EBEBEB] rounded-[16px] bg-white">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheck
          className="w-[18px] h-[18px] text-[#888888]"
          strokeWidth={1.5}
        />
        <span className="text-[13px] text-[#888888]">
          Your payment information is encrypted and secure
        </span>
      </div>

      <Button
        onClick={handleConfirm}
        disabled={!stripe || isProcessing}
        className="w-full h-[52px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium flex items-center justify-center gap-3 transition-all shadow-md active:scale-95 disabled:opacity-50"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Complete Payment
            <ArrowUpRight className="w-5 h-5" />
          </>
        )}
      </Button>
    </div>
  );
}

export interface AddressData {
  customer_email: string;
  customer_phone: string;
  shipping: Record<string, unknown>;
  billing: Record<string, unknown>;
}

interface PaymentFormProps {
  onBack: () => void;
  addressData: AddressData | null;
  appliedPromo: PromoValidateResponse | null;
}

export function PaymentForm({
  onBack,
  addressData,
  appliedPromo,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const router = useRouter();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { items, clearCart } = useCart();

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price || 0) * item.quantity;
  }, 0);

  const discount =
    appliedPromo?.valid && appliedPromo.discount_amount
      ? Number(appliedPromo.discount_amount)
      : 0;

  const currencySymbol = "AED ";

  const total = subtotal - discount;

  const handleSubmit = () => {
    if (!addressData) {
      toast.error("Address information is missing.");
      return;
    }

    if (clientSecret) {
      // Logic is handled by StripeSection if secret exists
      return;
    }

    const payload: OrderPayload = {
      customer_email: addressData.customer_email,
      customer_phone: addressData.customer_phone,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shipping_address: addressData.shipping as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      billing_address: addressData.billing as any,
      payment_method: paymentMethod === "card" ? "CARD" : "CASH_ON_DELIVERY",
      items: items.map((i) => {
        if (i.itemType === "PACKAGE") {
          return {
            id: i.id,
            item_type: "PACKAGE",
            quantity: 1,
            property_id: i.selectedPropertyId || i.id,
            addon_ids: i.selectedAddOnIds || [],
          };
        }
        return {
          id: i.id,
          item_type: "PRODUCT",
          quantity: i.quantity,
        };
      }),
      ...(appliedPromo?.valid && { promo_code: appliedPromo.code }),
    };

    createOrder(payload, {
      onSuccess: (data) => {
        if (paymentMethod === "card" && data.client_secret) {
          setClientSecret(data.client_secret);
          setOrderNumber(data.order_number);
          toast.success("Order created! Proceeding to payment.");
        } else {
          clearCart();
          router.push(ROUTES.CHECKOUT_SUCCESS + `?order=${data.order_number}`);
          toast.success("Order placed successfully!");
        }
      },
    });
  };

  const formatPrice = (value: number) => {
    return `${currencySymbol}${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="mb-2">
          <h2 className="text-[22px] font-semibold font-serif text-[#0A0A0A]">
            Payment Information
          </h2>
          <p className="text-[#888888] text-[14px] mt-1">
            Choose your preferred payment method and complete your order
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full relative items-start">
          {/* Left Column */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Payment Method */}
            <div className="border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">
                Payment Method
              </h3>

              <div className="flex flex-col gap-5">
                {/* Credit/Debit Card */}
                <label
                  className={`flex items-center justify-between p-5 rounded-[12px] border cursor-pointer transition-all ${paymentMethod === "card" ? "border-[#C9A76A] bg-[#C9A76A]/5" : "border-[#F2F2F2] hover:border-[#EBEBEB]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="peer w-[16px] h-[16px] appearance-none border border-[#D9D9D9] rounded-full bg-white checked:border-[#C9A76A] transition-all cursor-pointer"
                      />
                      <div className="absolute w-[8px] h-[8px] rounded-full bg-[#C9A76A] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                    </div>
                    <CreditCard
                      className="w-[20px] h-[20px] text-[#412A1F]"
                      strokeWidth={1.5}
                    />
                    <span className="text-[14.5px] font-medium text-[#1A1A1A]">
                      Credit/Debit Card
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[11px] font-bold text-[#412A1F] bg-[#412A1F]/5 px-2 py-0.5 rounded uppercase">
                      Visa
                    </span>
                    <span className="text-[11px] font-bold text-[#412A1F] bg-[#412A1F]/5 px-2 py-0.5 rounded uppercase">
                      Mastercard
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-5 rounded-[12px] border cursor-pointer transition-all ${paymentMethod === "cod" ? "border-[#C9A76A] bg-[#C9A76A]/5" : "border-[#F2F2F2] hover:border-[#EBEBEB]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="peer w-[16px] h-[16px] appearance-none border border-[#D9D9D9] rounded-full bg-white checked:border-[#C9A76A] transition-all cursor-pointer"
                      />
                      <div className="absolute w-[8px] h-[8px] rounded-full bg-[#C9A76A] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                    </div>
                    <Smartphone
                      className="w-[20px] h-[20px] text-[#412A1F]"
                      strokeWidth={1.5}
                    />
                    <span className="text-[14.5px] font-medium text-[#1A1A1A]">
                      Cash on Delivery
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Card Details / Stripe Section */}
            <AnimatePresence mode="wait">
              {paymentMethod === "card" && (
                <motion.div
                  key="card-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
                >
                  <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">
                    Card Details
                  </h3>

                  {!clientSecret ? (
                    <div className="flex flex-col gap-6 opacity-60">
                      <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-[12px] border border-dashed border-[#EBEBEB]">
                        <Lock className="w-5 h-5 text-[#888888]" />
                        <p className="text-[13.5px] text-[#888888]">
                          Card input will be active after you click &rdquo;Place
                          Order&ldquo; below.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripeSection
                        clientSecret={clientSecret}
                        orderNumber={orderNumber || ""}
                        onSuccess={() => {
                          clearCart();
                          router.push(
                            ROUTES.CHECKOUT_SUCCESS + `?order=${orderNumber}`,
                          );
                        }}
                      />
                    </Elements>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column / Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:w-[380px] shrink-0">
            {/* Order Summary */}
            <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 lg:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full">
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">
                Order Summary
              </h3>

              <div className="flex flex-col gap-4 mb-5">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#333333]">Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-[#EBEBEB] mb-5" />

              <div className="flex justify-between items-center mb-8">
                <span className="text-[15px] font-medium text-[#1A1A1A]">
                  Total
                </span>
                <span className="text-[18px] font-bold text-[#1A1A1A]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-[#888888]" strokeWidth={1.5} />
                  <span className="text-[13.5px] font-medium text-[#888888]">
                    Secure checkout
                  </span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={
                    isPending || (paymentMethod === "card" && !!clientSecret)
                  }
                  className="w-full h-[52px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium flex items-center justify-between px-6 transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isPending
                    ? "Processing..."
                    : clientSecret
                      ? "Payment Active"
                      : "Place Order"}
                  <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
                    <ArrowUpRight className="w-4 h-4 stroke-2" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-4 pt-6 border-t border-[#F2F2F2]/60 pb-10">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto h-[48px] px-8 rounded-[24px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14.5px] shadow-sm cursor-pointer transition-transform"
          >
            Back to Address
          </Button>
        </div>
      </div>

      {/* Mobile View - Exact match to screenshot */}
      <div className="lg:hidden flex flex-col gap-6 -mt-4">
        <h2 className="text-[20px] font-bold text-[#1a1a1a]">
          Payment Information
        </h2>

        <div className="flex flex-col gap-4">
          {/* Credit/Debit Card Option */}
          <button
            onClick={() => setPaymentMethod("card")}
            className={`flex items-center gap-4 px-6 h-[64px] rounded-[14px] border transition-all ${paymentMethod === "card" ? "border-[#C9A76A] bg-white shadow-sm" : "border-transparent bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)]"}`}
          >
            <CreditCard
              className={`w-5 h-5 ${paymentMethod === "card" ? "text-[#412A1F]" : "text-[#888888]"}`}
            />
            <span className="text-[15px] font-bold text-[#1a1a1a]">
              Credit/Debit Card
            </span>
          </button>

          {/* Cash on Delivery Option */}
          <button
            onClick={() => setPaymentMethod("cod")}
            className={`flex items-center gap-4 px-6 h-[64px] rounded-[14px] border transition-all ${paymentMethod === "cod" ? "border-[#C9A76A] bg-white shadow-sm" : "border-transparent bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)]"}`}
          >
            <Smartphone
              className={`w-5 h-5 ${paymentMethod === "cod" ? "text-[#412A1F]" : "text-[#888888]"}`}
            />
            <span className="text-[15px] font-bold text-[#1a1a1a]">
              Cash on Delivery
            </span>
          </button>

          {/* Bank Transfer Option */}
          <button
            onClick={() => setPaymentMethod("bank")}
            className={`flex items-center gap-4 px-6 h-[64px] rounded-[14px] border transition-all ${paymentMethod === "bank" ? "border-[#C9A76A] bg-white shadow-sm" : "border-transparent bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)]"}`}
          >
            <Smartphone
              className={`w-5 h-5 ${paymentMethod === "bank" ? "text-[#412A1F]" : "text-[#888888]"}`}
            />
            <span className="text-[15px] font-bold text-[#1a1a1a]">
              Bank Transfer
            </span>
          </button>

          {paymentMethod === "card" && (
            <AnimatePresence mode="wait">
              <motion.div
                key="mobile-card-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 mt-2"
              >
                {!clientSecret ? (
                  <div className="p-4 bg-white rounded-[14px] border border-dashed border-[#EBEBEB] shadow-sm">
                    <p className="text-[13px] text-[#888888] text-center">
                      Card Details will appear after placing order.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-[18px] p-5 shadow-sm border border-[#F2F2F2]">
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripeSection
                        clientSecret={clientSecret}
                        orderNumber={orderNumber || ""}
                        onSuccess={() => {
                          clearCart();
                          router.push(
                            ROUTES.CHECKOUT_SUCCESS + `?order=${orderNumber}`,
                          );
                        }}
                      />
                    </Elements>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-6 pb-10">
          <Button
            onClick={handleSubmit}
            disabled={isPending || (paymentMethod === "card" && !!clientSecret)}
            className="w-full h-[56px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[14px] text-[16px] font-bold shadow-lg disabled:opacity-50"
          >
            {isPending
              ? "Processing..."
              : clientSecret
                ? "Payment Active"
                : "Place Order"}
          </Button>
          <button
            onClick={onBack}
            className="w-full py-2 text-[15px] font-medium text-[#888888] hover:text-[#1a1a1a] transition-colors"
          >
            Back to Address
          </button>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, CreditCard, Smartphone, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";

interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function PaymentForm({ onBack, onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { items } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/,/g, '').replace(/[^\d.]/g, ''));
    return acc + (numericPrice || 0) * item.quantity;
  }, 0);

  const currencyMatch = items.length > 0 ? items[0].price.match(/^[^\d]+/) : null;
  const currencySymbol = currencyMatch ? currencyMatch[0] : "₹";
  
  const shipping = items.length > 0 ? 200 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full flex flex-col gap-6"
    >
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
              <label className={`flex items-center justify-between p-5 rounded-[12px] border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#EBEBEB]' : 'border-[#F2F2F2] hover:border-[#EBEBEB]'}`}>
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="peer w-[16px] h-[16px] appearance-none border border-[#D9D9D9] rounded-full bg-white checked:border-[#1A1A1A] transition-all cursor-pointer" 
                    />
                    <div className="absolute w-[8px] h-[8px] rounded-full bg-[#1A1A1A] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                  </div>
                  <CreditCard className="w-[20px] h-[20px] text-[#555555]" strokeWidth={1.5} />
                  <span className="text-[14.5px] font-medium text-[#1A1A1A]">Credit/Debit Card</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Visa</span>
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Mastercard</span>
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Rupay</span>
                </div>
              </label>

              {/* UPI Payment */}
              <label className={`flex items-center justify-between p-5 rounded-[12px] border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#EBEBEB]' : 'border-[#F2F2F2] hover:border-[#EBEBEB]'}`}>
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="upi" 
                      checked={paymentMethod === 'upi'} 
                      onChange={() => setPaymentMethod('upi')}
                      className="peer w-[16px] h-[16px] appearance-none border border-[#D9D9D9] rounded-full bg-white checked:border-[#1A1A1A] transition-all cursor-pointer" 
                    />
                    <div className="absolute w-[8px] h-[8px] rounded-full bg-[#1A1A1A] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                  </div>
                  <Smartphone className="w-[20px] h-[20px] text-[#555555]" strokeWidth={1.5} />
                  <span className="text-[14.5px] font-medium text-[#1A1A1A]">UPI Payment</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">GPay</span>
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">PhonePe</span>
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Paytm</span>
                </div>
              </label>

              {/* Digital Wallet */}
              <label className={`flex items-center justify-between p-5 rounded-[12px] border cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-[#EBEBEB]' : 'border-[#F2F2F2] hover:border-[#EBEBEB]'}`}>
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="wallet" 
                      checked={paymentMethod === 'wallet'} 
                      onChange={() => setPaymentMethod('wallet')}
                      className="peer w-[16px] h-[16px] appearance-none border border-[#D9D9D9] rounded-full bg-white checked:border-[#1A1A1A] transition-all cursor-pointer" 
                    />
                    <div className="absolute w-[8px] h-[8px] rounded-full bg-[#1A1A1A] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                  </div>
                  <Wallet className="w-[20px] h-[20px] text-[#555555]" strokeWidth={1.5} />
                  <span className="text-[14.5px] font-medium text-[#1A1A1A]">Digital Wallet</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Paytm</span>
                  <span className="text-[12px] font-medium text-[#1A1A1A] bg-white border border-[#EBEBEB] px-2.5 py-1 rounded-[6px]">Mobikwik</span>
                </div>
              </label>
            </div>
          </div>

          {/* Card Details */}
          <div className={`border border-[#EBEBEB] rounded-[16px] p-6 lg:p-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all ${paymentMethod !== 'card' ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">
              Card Details
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">Card Number</label>
                <Input 
                  placeholder="1234 5678 9012 3456" 
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1A1A1A]">Cardholder Name</label>
                <Input 
                  placeholder="John Doe" 
                  className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]" 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">Expiry Date</label>
                  <Input 
                    placeholder="MM/YY" 
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]" 
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">CVV</label>
                  <Input 
                    placeholder="123" 
                    type="password"
                    maxLength={4}
                    className="h-[46px] bg-[#F5F5F5] border-none rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] placeholder:text-[#888888]/80 focus-visible:ring-1 focus-visible:ring-[#C9A76A]" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <ShieldCheck className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.5} />
                <span className="text-[13px] text-[#888888]">Your payment information is encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column / Sidebar */}
        <div className="flex flex-col gap-6 w-full lg:w-[380px] shrink-0">
          
          {/* Order Summary */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 lg:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full">
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#333333]">Subtotal</span>
                <span className="font-semibold text-[#1A1A1A]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#333333]">Shipping</span>
                <span className="font-semibold text-[#1A1A1A]">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#333333]">Tax</span>
                <span className="font-semibold text-[#1A1A1A]">{formatPrice(tax)}</span>
              </div>
            </div>
            
            <div className="w-full h-px bg-[#EBEBEB] mb-5" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-[15px] font-medium text-[#1A1A1A]">Total</span>
              <span className="text-[18px] font-bold text-[#1A1A1A]">{formatPrice(total)}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#888888]" strokeWidth={1.5} />
                <span className="text-[13.5px] font-medium text-[#888888]">Secure checkout</span>
              </div>
              
              <Button 
                onClick={onSubmit}
                className="w-full h-[52px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[10px] text-[14.5px] font-medium flex items-center justify-between px-6 transition-all shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                Continue to Payment
                <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
                  <ArrowUpRight className="w-4 h-4 stroke-2" />
                </div>
              </Button>

              <p className="text-[12px] text-[#888888] text-center mt-3 px-2 leading-relaxed">
                By completing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 lg:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full">
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-5">Delivery Information</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[#555555]">Estimated delivery</span>
                <span className="font-medium text-[#1A1A1A]">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[#555555]">Free delivery</span>
                <span className="font-medium text-[#1A1A1A]">On orders over ₹999</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-[#555555]">Order tracking</span>
                <span className="font-medium text-[#1A1A1A]">Available</span>
              </div>
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
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto h-[48px] px-8 rounded-[24px] border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9F9F9] font-medium text-[14.5px] shadow-sm cursor-pointer transition-transform"
          >
            Save for Later
          </Button>
          <Button 
            onClick={onSubmit}
            className="w-full sm:w-auto h-[48px] bg-[#412A1F] hover:bg-[#2C1A11] text-white rounded-[24px] text-[14.5px] font-medium flex items-center justify-between sm:justify-center gap-4 px-2.5 sm:pl-6 sm:pr-2.5 pl-6 transition-all shadow-md cursor-pointer hover:shadow-lg"
          >
            Place Order
            <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center text-[#412A1F] shrink-0">
              <ArrowUpRight className="w-4 h-4 stroke-2" />
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

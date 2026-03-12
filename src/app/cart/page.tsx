import CartContent from "@/components/cart/cart-content";
import CartHeroSection from "@/components/cart/cart-hero-section";
import Testimonial from "@/components/common/testimonial";

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <CartHeroSection />
      <CartContent />
      <Testimonial />
    </div>
  );
}

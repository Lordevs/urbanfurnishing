"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ROUTES } from "@/constants/route";
import { useCart } from "@/context/cart-context";

export interface FeaturedItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  saveText?: string;
  badge1?: string;
  badge1Color?: string;
  badge2?: string;
  image: string;
  itemType: "PRODUCT" | "PACKAGE";
  isInStock: boolean;
}

interface FeaturedCarouselProps {
  title: React.ReactNode;
  description: string;
  items: FeaturedItem[];
  detailRoute?: (id: string) => string;
}

export function FeaturedCarousel({
  title,
  description,
  items,
  detailRoute,
}: FeaturedCarouselProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent, item: FeaturedItem) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      slug: item.slug,
      name: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      itemType: item.itemType,
    });
    router.push(ROUTES.CART);
  };
  return (
    <section className="py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto overflow-hidden">
      <div className="mb-10 text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-[40px] font-serif font-bold text-[#000000] tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#000000]/60 text-lg font-light mt-2 sm:mt-1"
        >
          {description}
        </motion.p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-full lg:basis-1/2"
              >
                <div
                  onClick={() =>
                    detailRoute && router.push(detailRoute(item.slug))
                  }
                  className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full min-h-[460px] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all"
                >
                  {/* Left: Image */}
                  <div className="relative w-full sm:w-[45%] shrink-0 min-h-[300px] sm:min-h-full bg-[#f8f8f8]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2.5">
                      {item.badge1 && (
                        <span
                          className={`px-3.5 py-1.5 rounded-md ${
                            item.badge1Color || "bg-[#D1B072]"
                          } text-white text-[10.5px] font-semibold tracking-wider uppercase text-center w-max`}
                        >
                          {item.badge1}
                        </span>
                      )}
                      {item.badge2 && (
                        <span className="px-3.5 py-1.5 rounded-md bg-[#1A1A1A] text-white text-[10.5px] font-semibold tracking-wider uppercase text-center w-max">
                          {item.badge2}
                        </span>
                      )}
                      {!item.isInStock && (
                        <span className="px-3.5 py-1.5 rounded-md bg-red-600 text-white text-[10.5px] font-semibold tracking-wider uppercase text-center w-max">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-7 lg:p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[#C9A76A] text-[10.5px] font-bold tracking-[0.15em] uppercase mb-2">
                        {item.category}
                      </h4>
                      <h3 className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#666666] text-[14.5px] mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                        {item.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-[#FAFAFA] border border-[#F2F2F2] px-4 py-3 rounded-[12px]"
                          >
                            <div className="w-[4px] h-[4px] rounded-full bg-[#D1B072] shrink-0" />
                            <span className="text-[12px] lg:text-[13px] text-[#333333] font-medium leading-tight line-clamp-1">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer / Price Area */}
                    <div className="border-t border-[#F0F0F0] pt-4 flex flex-col mt-auto justify-end">
                      <p className="text-[#888888] text-[12px] lg:text-[13px] font-medium mb-1">
                        Package Price
                      </p>
                      <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
                        <div className="flex flex-col shrink-0">
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="text-[24px] lg:text-[28px] font-bold text-[#000000] leading-none tracking-tight whitespace-nowrap">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[#B3B3B3] text-[14px] lg:text-[15px] font-medium tracking-tight line-through whitespace-nowrap">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-[#C5A67C] text-[12px] lg:text-[13px] font-medium whitespace-nowrap mt-0.5">
                            {item.saveText}
                          </p>
                        </div>

                        <motion.button
                          whileHover={item.isInStock ? { scale: 1.05 } : {}}
                          whileTap={item.isInStock ? { scale: 0.95 } : {}}
                          onClick={(e: React.MouseEvent) =>
                            item.isInStock && handleAddToCart(e, item)
                          }
                          disabled={!item.isInStock}
                          className={`rounded-[10px] lg:rounded-[12px] text-[13px] lg:text-[14px] font-medium px-5 lg:px-6 h-[42px] lg:h-[46px] flex items-center justify-center gap-2 transition-all shadow-none shrink-0 ml-auto ${
                            item.isInStock
                              ? "bg-[#412A1F]/90 hover:bg-[#412A1F] text-white cursor-pointer"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {item.isInStock ? (
                            <>
                              <ShoppingCart className="w-[16px] h-[16px]" />
                              <span className="whitespace-nowrap">
                                Add to Cart
                              </span>
                            </>
                          ) : (
                            <span className="whitespace-nowrap">
                              Out of Stock
                            </span>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious className="absolute -left-5 sm:-left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-[54px] h-[54px] bg-[#FBEBD9] border-none hover:bg-[#F3DECA] shadow-lg">
              <Image
                src="/common/arrow-left.svg"
                alt="Previous"
                width={20}
                height={20}
              />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-5 sm:-right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-[54px] h-[54px] bg-[#FBEBD9] border-none hover:bg-[#F3DECA] shadow-lg">
              <Image
                src="/common/arrow-right.svg"
                alt="Next"
                width={20}
                height={20}
              />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

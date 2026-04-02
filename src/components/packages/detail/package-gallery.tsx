import { Search, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PackageImage } from "@/types/api";

interface PackageGalleryProps {
  images: PackageImage[];
  packageName: string;
}

export function PackageGallery({ images, packageName }: PackageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [autoplayIndex, setAutoplayIndex] = useState(0);

  // Autoplay for lightbox
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLightboxOpen) {
      interval = setInterval(() => {
        setAutoplayIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLightboxOpen, images.length]);

  if (images.length === 0) {
    return (
      <div className="relative aspect-16/10 w-full rounded-[32px] overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image View */}
      <div className="relative aspect-16/10 w-full rounded-[32px] overflow-hidden bg-gray-100 group">
        <Image
          src={images[activeImage].image}
          alt={packageName}
          fill
          className="object-cover transition-all duration-700"
          priority
        />
        
        {/* Lightbox Trigger */}
        <button 
          onClick={() => {
            setAutoplayIndex(activeImage);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 z-20"
        >
          <Search className="w-5 h-5 text-[#3D261C]" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative min-w-[120px] aspect-16/10 rounded-2xl overflow-hidden border-2 transition-all shrink-0",
              activeImage === idx ? "border-[#C9A76A]" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img.image}
              alt="thumbnail"
              fill
              className="object-cover"
            />
            {idx === 1 && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
               </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 sm:p-10"
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-110"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-6xl aspect-16/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={autoplayIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                >
                  <Image
                    src={images[autoplayIndex].image}
                    alt="Lightbox Gallery"
                    fill
                    className="object-contain sm:object-cover"
                  />
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 h-1.5 bg-white/20 w-full overflow-hidden">
                    <motion.div 
                      key={`progress-${autoplayIndex}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-[#C9A76A]" 
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setAutoplayIndex((prev) => (prev - 1 + images.length) % images.length); }}
                  className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setAutoplayIndex((prev) => (prev + 1) % images.length); }}
                  className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                {autoplayIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

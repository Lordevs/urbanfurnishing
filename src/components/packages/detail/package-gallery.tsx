import { ZoomIn, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
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

  // Helper to detect if a URL is likely a video
  const isVideo = (url: string) => {
    return (
      url.toLowerCase().endsWith(".mp4") ||
      url.toLowerCase().endsWith(".webm") ||
      url.toLowerCase().endsWith(".ogg") ||
      url.toLowerCase().includes("video")
    );
  };

  // Autoplay for lightbox - slow down to 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLightboxOpen) {
      interval = setInterval(() => {
        setAutoplayIndex((prev) => (prev + 1) % images.length);
      }, 5000);
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
      <div className="relative aspect-16/10 w-full rounded-[32px] overflow-hidden bg-gray-100 group shadow-sm">
        <Image
          src={images[activeImage].image}
          alt={packageName}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        
        {/* Lightbox Trigger - ZoomIn icon */}
        <button 
          onClick={() => {
            setAutoplayIndex(activeImage);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 z-20"
        >
          <ZoomIn className="w-7 h-7 text-[#3D261C]" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative min-w-[140px] aspect-16/10 rounded-2xl overflow-hidden border-2 transition-all shrink-0 snap-start",
              activeImage === idx ? "border-[#C9A76A]" : "border-transparent opacity-80 hover:opacity-100"
            )}
          >
            <Image
              src={img.image}
              alt="thumbnail"
              fill
              className="object-cover"
            />
            {/* Show video icon if it's a video */}
            {isVideo(img.image) && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Play className="w-5 h-5 text-white fill-white" />
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
            className="fixed inset-0 z-100 bg-black/98 flex items-center justify-center p-4 sm:p-10"
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
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                >
                  {isVideo(images[autoplayIndex].image) ? (
                    <video 
                      src={images[autoplayIndex].image} 
                      autoPlay 
                      muted 
                      loop 
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <Image
                      src={images[autoplayIndex].image}
                      alt="Lightbox Gallery"
                      fill
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setAutoplayIndex((prev) => (prev - 1 + images.length) % images.length); }}
                  className="w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setAutoplayIndex((prev) => (prev + 1) % images.length); }}
                  className="w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-sm transition-all hover:scale-110"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Lightbox Thumbnails & Counter */}
              <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-6">
                {/* Counter */}
                <div className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-white/5">
                  {autoplayIndex + 1} / {images.length}
                </div>

                {/* Thumbnails in Lightbox */}
                <div className="flex gap-3 px-4 max-w-full overflow-x-auto pb-4 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={`lightbox-thumb-${img.id}`}
                      onClick={(e) => { e.stopPropagation(); setAutoplayIndex(idx); }}
                      className={cn(
                        "relative w-20 aspect-16/10 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                        autoplayIndex === idx ? "border-[#C9A76A]" : "border-transparent opacity-50 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img.image}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

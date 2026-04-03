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

  // Autoplay for main view - 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLightboxOpen) {
        setActiveImage((prev) => (prev + 1) % images.length);
      }
    }, 5000);
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
      {/* Main Image View with Slide Effect */}
      <div
        className="relative aspect-16/10 w-full rounded-lg overflow-hidden bg-gray-100 group shadow-sm cursor-pointer"
        onClick={() => {
          setAutoplayIndex(activeImage);
          setIsLightboxOpen(true);
        }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full">
            {isVideo(images[activeImage].image) ? (
              <video
                src={images[activeImage].image}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={images[activeImage].image}
                alt={packageName}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Show on hover */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(
                (prev) => (prev - 1 + images.length) % images.length,
              );
            }}
            className="w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#3D261C] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 pointer-events-auto cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev + 1) % images.length);
            }}
            className="w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#3D261C] shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 pointer-events-auto cursor-pointer">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Lightbox Trigger - ZoomIn icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoplayIndex(activeImage);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 z-20 cursor-pointer">
          <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-[#3D261C]" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative min-w-[140px] aspect-16/10 rounded-lg overflow-hidden border-2 transition-all shrink-0 snap-start cursor-pointer",
              activeImage === idx
                ? "border-[#C9A76A]"
                : "border-transparent opacity-80 hover:opacity-100",
            )}>
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
            className="fixed inset-0 z-100 bg-black/98 flex items-center justify-center p-4 sm:p-10">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-110 cursor-pointer">
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container - Fixed Aspect & Height Constrained */}
            <div className="relative w-full max-w-7xl aspect-16/10 max-h-[80vh] rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center bg-black/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={autoplayIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full">
                  {isVideo(images[autoplayIndex].image) ? (
                    <video
                      src={images[autoplayIndex].image}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={images[autoplayIndex].image}
                      alt="Lightbox Gallery"
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Counter - Fixedly on the bottom center of the active picture */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-2.5 rounded-full text-sm font-semibold backdrop-blur-xl border border-white/10 z-50">
                    {autoplayIndex + 1} / {images.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 z-40 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoplayIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    );
                  }}
                  className="w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-md transition-all hover:scale-110 shadow-2xl cursor-pointer">
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoplayIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-md transition-all hover:scale-110 shadow-2xl cursor-pointer">
                  <ChevronRight className="w-10 h-10" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

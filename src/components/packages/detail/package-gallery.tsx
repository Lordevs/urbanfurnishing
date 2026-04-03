"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <div className="relative aspect-16/10 w-full rounded-[32px] overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300 border border-black/5">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image View with Smooth Slide Effect */}
      <div
        className="relative aspect-16/10 w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gray-100 group shadow-lg cursor-pointer border border-black/5"
        onClick={() => {
          setAutoplayIndex(activeImage);
          setIsLightboxOpen(true);
        }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
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
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Pills for Main Image */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  activeImage === i
                    ? "bg-white w-8 shadow-md"
                    : "bg-white/40 w-1.5",
                )}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows - Show on hover */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(
                (prev) => (prev - 1 + images.length) % images.length,
              );
            }}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:scale-110 pointer-events-auto cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev + 1) % images.length);
            }}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:scale-110 pointer-events-auto cursor-pointer">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Lightbox Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoplayIndex(activeImage);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 z-20 cursor-pointer border border-white/20">
          <ZoomIn className="w-6 h-6 text-primary" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative min-w-[140px] aspect-16/10 rounded-xl overflow-hidden border-2 transition-all shrink-0 snap-start cursor-pointer shadow-sm",
              activeImage === idx
                ? "border-secondary scale-[1.02] shadow-md"
                : "border-transparent opacity-60 hover:opacity-100",
            )}>
            <Image
              src={img.image}
              alt="thumbnail"
              fill
              className="object-cover"
            />
            {isVideo(img.image) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
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
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-110 cursor-pointer hover:rotate-90">
              <X className="w-8 h-8" />
            </button>

            {/* Lightbox Image Container */}
            <div className="relative w-full max-w-7xl aspect-16/10 max-h-[85vh] rounded-[40px] overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 bg-black/40">
              <AnimatePresence initial={false}>
                <motion.div
                  key={autoplayIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
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

                  {/* Counter */}
                  <div className="absolute bottom-8 right-10 bg-black/40 text-white px-8 py-3 rounded-full text-[15px] font-bold backdrop-blur-2xl border border-white/10 z-50 tracking-tight">
                    {autoplayIndex + 1}{" "}
                    <span className="opacity-40 mx-2">/</span> {images.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 z-40 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoplayIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    );
                  }}
                  className="w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-md transition-all hover:scale-110 shadow-2xl cursor-pointer border border-white/5">
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoplayIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white pointer-events-auto backdrop-blur-md transition-all hover:scale-110 shadow-2xl cursor-pointer border border-white/5">
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

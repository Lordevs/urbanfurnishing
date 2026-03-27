import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ROUTES } from "@/constants/route";
import { usePortfolioProjectDetail } from "@/hooks/queries/use-portfolio-project-detail";

import { PrimaryButton } from "../common/primary-button";

interface ProjectModalProps {
  slug: string | null;
  onClose: () => void;
}

export const ProjectModal = ({ slug, onClose }: ProjectModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false);

  const {
    data: selectedProject,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail,
  } = usePortfolioProjectDetail(slug);

  const nextImage = useCallback(() => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setDirection(1);
      setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  }, [selectedProject]);

  const prevImage = () => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setDirection(-1);
      setActiveImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.images.length) %
          selectedProject.images.length,
      );
    }
  };

  // Variants for slide effect
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Autoplay Effect
  useEffect(() => {
    if (!slug || isPaused || (selectedProject?.images?.length || 0) <= 1)
      return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [slug, isPaused, selectedProject, nextImage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (slug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [slug]);

  return (
    <AnimatePresence>
      {slug && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-start lg:items-center justify-center p-6 lg:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto">
          {/* Close Button Outside */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-[#C9A76A] transition-colors p-2 z-110 cursor-pointer">
            <X className="w-8 h-8" />
          </button>


          {(isLoadingDetail || isFetchingDetail) && !selectedProject ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          ) : selectedProject ? (
            <motion.div
              key={slug}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-7xl h-auto lg:h-[85vh] rounded-[32px] overflow-hidden flex flex-col lg:flex-row relative shadow-2xl">

              {/* Left Side: Image Gallery & Active View */}
              <div className="w-full h-auto lg:h-full flex flex-col lg:flex-row flex-none lg:flex-1">
                {/* Thumbnails Sidebar - Left */}
                <div className="w-full lg:w-[120px] bg-gray-50 px-4 py-6 lg:p-6 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto order-2 lg:order-1 no-scrollbar border-y lg:border-r border-gray-100">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        setDirection(idx > activeImageIndex ? 1 : -1);
                        setActiveImageIndex(idx);
                        setIsPaused(true); // Pause on manual interaction
                      }}
                      className={`relative aspect-square w-16 lg:w-full shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-[#C9A76A] ring-2 ring-[#C9A76A]/20"
                          : "border-transparent hover:border-gray-200"
                      }`}>
                      <Image
                        src={img.image}
                        alt={img.alt_text || `Thumbnail ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Active Image - Right of Thumbnails */}
                <div
                  className="w-full aspect-4/5 lg:aspect-auto lg:flex-1 relative bg-gray-100 order-1 lg:order-2 group overflow-hidden"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}>
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={
                        selectedProject.images[activeImageIndex]?.id || "empty"
                      }
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                      }}
                      className="absolute inset-0">
                      {selectedProject.images[activeImageIndex] && (
                        <Image
                          src={selectedProject.images[activeImageIndex].image}
                          alt={
                            selectedProject.images[activeImageIndex].alt_text ||
                            selectedProject.title
                          }
                          fill
                          className="object-cover"
                          priority
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <div className="hidden absolute inset-x-0 top-1/2 -translate-y-1/2 md:flex justify-between px-4 sm:px-6 pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-all pointer-events-auto hover:scale-105 active:scale-95">
                        <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-all pointer-events-auto hover:scale-105 active:scale-95">
                        <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Info Panel */}
              <div className="w-full lg:w-[400px] lg:min-w-[400px] flex flex-col lg:border-l border-gray-100 bg-white flex-1 lg:flex-none lg:h-full min-h-0">
                <div className="h-auto lg:flex-1 lg:min-h-0">
                  <ScrollArea className="h-auto lg:h-full">
                    <div className="p-8 lg:p-12">
                      <div className="mb-8">
                        <span className="text-[#C9A76A] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                          Portfolio Detail
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1A1A1A] mb-6 leading-tight">
                          {selectedProject.title}
                        </h2>
                        <div className="w-12 h-px bg-[#C9A76A] mb-8" />
                        <p className="text-[#666666] text-lg font-light leading-relaxed whitespace-pre-wrap">
                          {selectedProject.description ||
                            "No description available."}
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-8 lg:p-12 pt-0 md:pt-8 border-t border-gray-100 bg-white">
                  <p className="text-[#1A1A1A] font-medium text-sm mb-4">
                    Interested in this style?
                  </p>
                  <PrimaryButton
                    mbLabel="Book a Consultation"
                    label="Book a Consultation"
                    href={ROUTES.BOOK_CONSULTATION}
                    className="sm:w-full sm:justify-center"
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

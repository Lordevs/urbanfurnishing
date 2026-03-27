"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import { usePortfolioProjects } from "@/hooks/queries/use-portfolio-projects";
import type { PortfolioProjectListItem } from "@/types/api";

import { ProjectModal } from "./project-modal";
import { ProjectGridSkeleton } from "./project-skeleton";
import { Button } from "../ui/button";

const ProjectCard = ({
  project,
  onOpen,
  index,
}: {
  project: PortfolioProjectListItem;
  onOpen: (slug: string) => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: (index % 10) * 0.1 }}
    onClick={() => onOpen(project.slug)}
    className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] cursor-pointer bg-[#F5F5F5] break-inside-avoid mb-4 sm:mb-5 lg:mb-6 block">
    <div className="relative w-full">
      <Image
        src={project.thumbnail}
        alt={project.title}
        width={500}
        height={500}
        loading="lazy"
        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 z-10">
        <div className="text-center">
          <p className="text-white text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            View Project
          </p>
          <h3 className="text-white text-xl sm:text-2xl font-serif font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function DesignDirection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const closeProject = useCallback(() => {
    setSelectedSlug(null);
  }, []);

  // Portfolio list hook
  const {
    data,
    isLoading,
    isInitialLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePortfolioProjects(6);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeProject]);

  const openProject = (slug: string) => {
    setSelectedSlug(slug);
  };

  const projects = data?.pages.flatMap((page) => page.results) ?? [];

  // If no projects are found after initial load, don't show the section at all
  if (!isInitialLoading && !isLoading && projects.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      {/* Main Container */}
      <div className="py-12 md:py-20 px-4 sm:px-10 lg:px-16 max-w-8xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-[46px] font-serif font-bold tracking-tight text-[#1A1A1A] mb-3 sm:mb-4">
            Design Direction
          </h2>
          <p className="text-[#666666] text-[15px] sm:text-[18px] font-medium sm:font-light max-w-lg mx-auto leading-[1.6]">
            Explore our diverse portfolio of design styles and find the perfect
            aesthetic for your space
          </p>
        </div>

        {isInitialLoading ? (
          <ProjectGridSkeleton />
        ) : (
          <div className="flex flex-col gap-8 w-full">
            {/* Masonry Grid Setup */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 w-full">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={openProject}
                  index={index}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="flex items-center gap-2 px-8 py-6 border border-[#1A1A1A]/10 hover:border-[#C9A76A] hover:bg-[#C9A76A] hover:text-white rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group text-[#1A1A1A]">
                  {isFetchingNextPage && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {isFetchingNextPage ? "Loading..." : "Load More Projects"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal slug={selectedSlug} onClose={closeProject} />
    </section>
  );
}

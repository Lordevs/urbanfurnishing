export const ProjectCardSkeleton = ({ index }: { index: number }) => {
  // Random heights for masonry effect skeleton
  const heights = ["h-[300px]", "h-[450px]", "h-[350px]", "h-[400px]", "h-[500px]", "h-[320px]"];
  const height = heights[index % heights.length];

  return (
    <div className={`w-full ${height} bg-[#F5F5F5] rounded-[24px] mb-6 animate-pulse relative overflow-hidden`}>
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
};

export const ProjectGridSkeleton = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full">
      {[...Array(6)].map((_, i) => (
        <ProjectCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
};

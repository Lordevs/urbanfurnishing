import { ArrowUp } from "lucide-react";

export default function PathwayNav() {
  return (
    <div className="w-full px-4 sm:px-10 lg:px-16 max-w-[1400px] mx-auto py-8">
      <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#FCFAF8] border border-[#F0EBE3] shadow-sm">
        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm shrink-0">
          <ArrowUp className="w-4 h-4 text-gray-500" />
        </div>
        <button className="px-5 sm:px-6 py-2.5 rounded-full bg-[#412A1F] text-white text-xs sm:text-sm font-medium transition-colors">
          Select Packages
        </button>
        <button className="px-4 sm:px-6 py-2.5 rounded-full bg-transparent text-gray-600 text-xs sm:text-sm font-medium hover:bg-white hover:shadow-sm transition-all">
          Shop Individually
        </button>
        <button className="px-4 sm:px-6 py-2.5 rounded-full bg-transparent text-gray-600 text-xs sm:text-sm font-medium hover:bg-white hover:shadow-sm transition-all whitespace-nowrap">
          Use Our Design Expert
        </button>
      </div>
    </div>
  );
}

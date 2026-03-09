import Hero from "@/components/home/hero";
import Services from "@/components/home/services";
import PathwayNav from "@/components/home/pathway-nav";
import Packages from "@/components/home/packages";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <PathwayNav />
      <Packages />
    </main>
  );
}

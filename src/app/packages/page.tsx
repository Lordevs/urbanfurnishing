import DynamicHero from "@/components/common/dynamic-hero";
import InvestorTurnkey from "@/components/packages/investor-turnkey";
import EndUserSignature from "@/components/packages/end-user-signature";

export default function Packages() {
  return (
    <main className="flex min-h-screen flex-col">
      <DynamicHero
        badgeText="FURNISHING PACKAGES"
        title={
          <>
            Three Structured
            <br />
            <span className="italic font-light font-serif text-[#8E7D62]">
              Pathways
            </span>
          </>
        }
        description={
          <>
            Each package is priced clearly with defined scope and
            <br className="hidden sm:block" /> timeline, designed for different
            client types and property needs
          </>
        }
      />
      <InvestorTurnkey />
      <EndUserSignature />
    </main>
  );
}

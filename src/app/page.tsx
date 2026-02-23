import { Hero } from "@/components/landing/hero";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { ExampleCards } from "@/components/landing/example-cards";
import { BuiltForBuilders } from "@/components/landing/built-for-builders";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Ambient corner glows — warm rusty spice wash */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Bottom-left — primary warm orb */}
        <div className="absolute -bottom-[200px] -left-[150px] h-[700px] w-[700px] rounded-full bg-[#B95126]/[0.07] blur-[200px]" />
        <div className="absolute -bottom-[100px] -left-[50px] h-[400px] w-[400px] rounded-full bg-[#B95126]/[0.05] blur-[150px]" />
        {/* Bottom-right — subtle secondary orb */}
        <div className="absolute -bottom-[200px] -right-[150px] h-[600px] w-[600px] rounded-full bg-[#B95126]/[0.05] blur-[200px]" />
        <div className="absolute -bottom-[80px] -right-[80px] h-[350px] w-[350px] rounded-full bg-[#B95126]/[0.04] blur-[140px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <ProblemSolution />
        <ExampleCards />
        <BuiltForBuilders />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

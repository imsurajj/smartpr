import { Layout } from "@/components/layout/Layout";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { CTA } from "@/components/sections/CTA";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Home() {
  return (
    <Layout>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <HowItWorks />
      <AnimatedSection>
        <CTA />
      </AnimatedSection>
    </Layout>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <CTA />
    </Layout>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary/5 px-6 py-24 text-center sm:px-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your
              <span className="block text-primary mt-1">code review process?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join developers who are using Smart<span className="text-primary">PR</span> to write better code,
              catch bugs early, and maintain high code quality standards.
            </p>
            <div className="mt-10">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 -z-10 h-[800px] w-[800px] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/5 to-transparent rounded-full blur-2xl" />
          </div>
          <div className="absolute right-0 top-1/2 -z-10 h-[800px] w-[800px] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/30 via-primary/5 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
} 
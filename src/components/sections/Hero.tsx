"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      {/* Combined Background Pattern and Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: 
            'linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.03) 100%), ' +
            'linear-gradient(-45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.03) 100%), ' +
            'radial-gradient(ellipse at center, rgba(var(--primary-rgb), 0.05) 0%, transparent 70%)',
          backgroundSize: '20px 20px, 20px 20px, 100% 100%',
        }}
      ></div>

      {/* Existing Gradient Blob (keep it for the unique shape/blur) */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Main content - ensure it's on top */}
      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            AI-Powered Code
            <br />
            <span className="text-primary">Review Assistant</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            SmartPR automates GitHub pull request reviews using advanced AI technology. 
            Get instant, intelligent feedback on your code changes powered by Trae AI IDE, 
            Novita.ai LLMs, and Zilliz vector database.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">Try SmartPR Now</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 
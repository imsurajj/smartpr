"use client";

import { Bot, Code2, GitPullRequest, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "Instant Code Reviews",
    description:
      "Get immediate feedback on your pull requests with AI-powered analysis that catches bugs, security issues, and style violations.",
    icon: GitPullRequest,
  },
  {
    name: "AI-Powered Analysis",
    description:
      "Advanced machine learning models analyze your code for patterns, best practices, and potential improvements.",
    icon: Bot,
  },
  {
    name: "Code Quality Insights",
    description:
      "Detailed reports on code quality, complexity, and maintainability with actionable suggestions for improvement.",
    icon: Code2,
  },
  {
    name: "Fast & Efficient",
    description:
      "Lightning-fast analysis that integrates seamlessly with your development workflow, saving you time and effort.",
    icon: Zap,
  },
];

export function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="features"
      ref={ref}
      className="container mx-auto px-4 py-14 sm:py-32"
    >
      <div className={cn(
        "mx-auto max-w-2xl text-center transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need for better code reviews
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          SmartPR combines advanced AI with developer-friendly features to streamline your code review process.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={cn(
                "relative flex flex-col gap-6 rounded-2xl border p-8 transition-all duration-700 ease-out hover:shadow-lg",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
                // Stagger the animation of each card
                inView && `delay-[${index * 200}ms]`
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
"use client";

import { AnimatedSection } from "../ui/animated-section";
import { Card, CardContent } from "../ui/card";
import { GitPullRequest, Code, CheckCircle2, Bot } from "lucide-react";

const steps = [
  {
    title: "Connect Your Repository",
    description: "Link your GitHub repository to SmartPR with just a few clicks",
    icon: GitPullRequest,
  },
  {
    title: "Submit Code for Review",
    description: "Push your code or create a pull request to trigger automated review",
    icon: Code,
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes your code for bugs, security issues, and best practices",
    icon: Bot,
  },
  {
    title: "Get Detailed Reports",
    description: "Receive comprehensive reports with actionable insights and fixes",
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get started with SmartPR in just a few simple steps. Our AI-powered platform
            makes code review effortless and efficient.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {steps.map((step, index) => (
            <AnimatedSection key={step.title} className="h-full">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
} 
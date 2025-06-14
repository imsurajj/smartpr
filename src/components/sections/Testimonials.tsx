"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    content:
      "SmartPR has revolutionized our code review process. The AI-powered insights have helped us catch bugs early and maintain high code quality.",
    author: {
      name: "Sarah Chen",
      role: "Lead Developer",
      company: "TechCorp",
      image: "/avatars/sarah.jpg",
    },
  },
  {
    content:
      "The integration with GitHub is seamless, and the AI suggestions are incredibly accurate. It's like having a senior developer reviewing your code 24/7.",
    author: {
      name: "Michael Rodriguez",
      role: "Senior Engineer",
      company: "DevStream",
      image: "/avatars/michael.jpg",
    },
  },
  {
    content:
      "Using SmartPR has significantly reduced our review cycle time. The automated checks and intelligent suggestions have made our team more productive.",
    author: {
      name: "Emily Thompson",
      role: "CTO",
      company: "CodeFlow",
      image: "/avatars/emily.jpg",
    },
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Testimonials
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Loved by developers
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          See what developers are saying about SmartPR's AI-powered code review
          assistant.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card
            key={i}
            className="flex flex-col justify-between p-8 bg-card shadow-lg"
          >
            <div className="mb-8">
              <p className="text-lg text-card-foreground">
                "{testimonial.content}"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.author.image} />
                <AvatarFallback>
                  {testimonial.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-card-foreground">
                  {testimonial.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.role} at {testimonial.author.company}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
} 
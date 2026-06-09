import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  heading: string;
  subheading?: string;
  features: Feature[];
}

export function Features({ heading, subheading, features }: FeaturesProps) {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">{heading}</h2>
          {subheading && (
            <p className="mt-4 text-lg text-[var(--color-muted)]">{subheading}</p>
          )}
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <Card
      variant="raised"
      className="group p-1 transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      <CardContent className="p-6">
        {/* Icon */}
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
          style={{
            background:
              "color-mix(in srgb, var(--color-primary) 12%, transparent)",
            color: "var(--color-primary)",
          }}
        >
          {icon}
        </div>

        <h3 className="font-heading text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

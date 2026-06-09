import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaLink {
  label: string;
  href: string;
}

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: CtaLink;
  highlighted?: boolean;
}

interface PricingProps {
  heading: string;
  subheading?: string;
  tiers: PricingTier[];
}

export function Pricing({ heading, subheading, tiers }: PricingProps) {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">{heading}</h2>
          {subheading && (
            <p className="mt-4 text-lg text-[var(--color-muted)]">{subheading}</p>
          )}
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false,
}: PricingTier) {
  return (
    <Card
      variant={highlighted ? "default" : "raised"}
      className={cn(
        "relative flex flex-col",
        highlighted &&
          "border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/10"
      )}
      style={
        highlighted
          ? {
              background:
                "linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-raised)), var(--color-surface-raised))",
            }
          : undefined
      }
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
          }}
        >
          Most popular
        </div>
      )}

      <CardContent className="flex flex-1 flex-col gap-6 p-8">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            {name}
          </p>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-heading font-bold">{price}</span>
            {period && (
              <span className="mb-1 text-sm text-[var(--color-muted)]">{period}</span>
            )}
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{description}</p>
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check
                size={16}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--color-primary)" }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={highlighted ? "primary" : "outline"}
          size="lg"
          className="w-full"
          asChild
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

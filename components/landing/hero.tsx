import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CtaLink {
  label: string;
  href: string;
}

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: CtaLink;
  ctaSecondary?: CtaLink;
  badge?: string;
}

export function Hero({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  badge,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent)",
        }}
      />

      <div className="container-page text-center">
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-1.5 text-sm font-medium text-[var(--color-muted)]">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            {badge}
          </div>
        )}

        <h1 className="mx-auto max-w-4xl text-4xl font-heading font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-gradient">{headline}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">
          {subheadline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
          </Button>

          {ctaSecondary && (
            <Button variant="outline" size="lg" asChild>
              <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
            </Button>
          )}
        </div>

        {/* Social proof strip */}
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          No credit card required &middot; Free 14-day trial
        </p>
      </div>
    </section>
  );
}

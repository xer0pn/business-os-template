import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import {
  BarChart3,
  Shield,
  Zap,
  Globe,
  Users,
  Layers,
} from "lucide-react";

// ─── All page copy lives here — never in the components ───────────────────────

const heroContent = {
  badge: "Now in public beta",
  headline: "Run Your Entire Business From One Place",
  subheadline:
    "Business OS unifies your team, tools, and workflows into a single intelligent platform — so you can focus on building, not managing.",
  ctaPrimary: { label: "Start for free", href: "#pricing" },
  ctaSecondary: { label: "See how it works", href: "#features" },
};

const featuresContent = {
  heading: "Everything your business needs",
  subheading:
    "A complete operating system built for modern teams — from startup to scale.",
  features: [
    {
      icon: <BarChart3 size={24} />,
      title: "Real-time Analytics",
      description:
        "Dashboards that update instantly. Track revenue, churn, and growth metrics without waiting for reports.",
    },
    {
      icon: <Shield size={24} />,
      title: "Enterprise Security",
      description:
        "Row-level security, SOC 2 Type II, and SSO out of the box. Your data stays yours.",
    },
    {
      icon: <Zap size={24} />,
      title: "Workflow Automation",
      description:
        "Build automations without code. Connect any tool in your stack and let the platform do the heavy lifting.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Infrastructure",
      description:
        "Deployed across 30+ regions. Sub-100ms latency for your customers wherever they are.",
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description:
        "Shared workspaces, granular permissions, and real-time presence so your team always stays in sync.",
    },
    {
      icon: <Layers size={24} />,
      title: "Modular by Design",
      description:
        "Start with what you need. Activate modules as you grow — CRM, billing, support, and more.",
    },
  ],
};

const pricingContent = {
  heading: "Simple, transparent pricing",
  subheading:
    "No hidden fees, no surprise overages. Cancel any time.",
  tiers: [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for solopreneurs and small teams getting started.",
      features: [
        "Up to 3 team members",
        "5 active workflows",
        "10 GB storage",
        "Email support",
        "Core analytics",
      ],
      cta: { label: "Get started", href: "#" },
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description:
        "For growing teams that need more power and integrations.",
      features: [
        "Up to 25 team members",
        "Unlimited workflows",
        "100 GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "SSO / SAML",
      ],
      cta: { label: "Start free trial", href: "#" },
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description:
        "For large orgs with security, compliance, and SLA requirements.",
      features: [
        "Unlimited team members",
        "Unlimited everything",
        "Dedicated infrastructure",
        "24 / 7 SLA support",
        "Custom contracts",
        "Onboarding & training",
        "SOC 2 / HIPAA",
      ],
      cta: { label: "Contact sales", href: "mailto:sales@example.com" },
      highlighted: false,
    },
  ],
};

const faqContent = {
  heading: "Frequently asked questions",
  items: [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes — upgrade or downgrade at any time from your account settings. Changes take effect immediately and are prorated on your next invoice.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Every Pro plan comes with a 14-day free trial. No credit card required. The Starter plan is free forever with limited seats.",
    },
    {
      question: "How does billing work?",
      answer:
        "We bill monthly or annually (20% discount). All plans are charged in USD. We accept all major credit cards and ACH for Enterprise customers.",
    },
    {
      question: "Where is my data stored?",
      answer:
        "Data is stored on Supabase infrastructure running on AWS. You can choose your preferred region during onboarding. We never sell or share your data.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "If you're unsatisfied within the first 30 days we'll issue a full refund — no questions asked.",
    },
    {
      question: "What integrations do you support?",
      answer:
        "We connect with 200+ tools including Slack, Notion, Linear, HubSpot, Stripe, and more. Custom webhooks and a public REST API are available on Pro and above.",
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main>
      <Hero {...heroContent} />
      <Features {...featuresContent} />
      <Pricing {...pricingContent} />
      <FAQ {...faqContent} />
    </main>
  );
}

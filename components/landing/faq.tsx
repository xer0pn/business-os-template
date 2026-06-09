"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string;
  subheading?: string;
  items: FAQItem[];
}

export function FAQ({ heading, subheading, items }: FAQProps) {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">{heading}</h2>
          {subheading && (
            <p className="mt-4 text-lg text-[var(--color-muted)]">{subheading}</p>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-[var(--color-border)]">
          {items.map((item) => (
            <AccordionItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
      >
        {question}
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-[var(--color-muted)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{answer}</p>
      </div>
    </div>
  );
}

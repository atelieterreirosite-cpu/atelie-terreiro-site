"use client";

import { useState } from "react";

import type { AboutComplementarySection } from "@/types/views";

interface AboutComplementaryProps {
  title: string;
  sections: AboutComplementarySection[];
}

export function AboutComplementary({ title, sections }: AboutComplementaryProps) {
  const [open, setOpen] = useState(false);

  return (
    <section id="complementar" className="scroll-mt-28 border-t border-border pt-12">
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls="about-complementary-content"
        onClick={() => setOpen((value) => !value)}
      >
        <h2 className="font-display text-2xl font-light tracking-wide transition-colors duration-300 group-hover:text-accent motion-reduce:transition-none md:text-3xl">
          {title}
        </h2>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center text-muted"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      <div
        id="about-complementary-content"
        className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${
          open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="space-y-10 pb-2">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-xs tracking-[0.15em] text-muted-light uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="whitespace-pre-line text-sm leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

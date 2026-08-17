import Link from "next/link";

import type { RelatedLink } from "@/types/views";

interface AboutPageNavProps {
  items: { id: string; label: string }[];
}

export function AboutPageNav({ items }: AboutPageNavProps) {
  return (
    <nav
      aria-label="Navegação interna da página Sobre"
      className="mx-auto max-w-3xl border-y border-border px-6 py-4 md:px-10 md:py-5"
    >
      <ul className="-mx-6 flex gap-x-5 gap-y-2 overflow-x-auto px-6 pb-1 scrollbar-thin md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="link-underline inline-block py-1 text-xs tracking-[0.12em] whitespace-nowrap text-muted uppercase transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface AboutLinksProps {
  links: RelatedLink[];
}

/** Rótulo público da seção; href `/arquivo/` permanece. */
function publicLinkLabel(link: RelatedLink): string {
  const path = link.href.replace(/\/$/, "") || "/";
  if (path === "/arquivo" && (link.label === "Arquivo" || link.label === "Arquivo / Portfólio")) {
    return "Portfólio";
  }
  return link.label;
}

export function AboutLinks({ links }: AboutLinksProps) {
  return (
    <section className="space-y-6 border-t border-border pt-12">
      <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Explorar o site</h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="link-underline font-display text-xl font-light tracking-wide text-foreground/85 transition-colors duration-300 hover:text-foreground md:text-2xl"
            >
              {publicLinkLabel(link)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

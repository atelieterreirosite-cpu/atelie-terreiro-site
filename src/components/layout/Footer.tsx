import Link from "next/link";

import { mainNavigation } from "@/data/navigation";
import type { SiteInfo } from "@/types/site";

interface FooterProps {
  site: SiteInfo;
}

export function Footer({ site }: FooterProps) {
  const { name, tagline, address, social } = site;
  const currentYear = new Date().getFullYear();
  const addressLines = [
    address.street,
    [address.neighborhood, address.city].filter(Boolean).join(", "),
    address.region,
  ].filter(Boolean);
  const hasAddress = addressLines.length > 0;

  return (
    <footer className="border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 sm:gap-12 md:px-10 md:py-20 lg:grid-cols-3">
        <div className="space-y-4">
          {name ? (
            <p className="font-display text-2xl font-light tracking-wide">{name}</p>
          ) : null}
          {tagline ? (
            <p className="max-w-xs whitespace-pre-line text-sm leading-relaxed text-muted">
              {tagline}
            </p>
          ) : null}
        </div>

        <div className="space-y-4">
          <p className="text-xs tracking-[0.15em] text-muted-light uppercase">
            Navegação
          </p>
          <nav aria-label="Navegação do rodapé">
            <ul className="space-y-2">
              {mainNavigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-foreground/80 transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-6">
          {hasAddress ? (
            <div className="space-y-2">
              <p className="text-xs tracking-[0.15em] text-muted-light uppercase">
                Endereço
              </p>
              <address className="text-sm leading-relaxed text-muted not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ) : null}

          {social.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs tracking-[0.15em] text-muted-light uppercase">
                Redes
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-foreground/80 transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-light md:px-10">
          © {currentYear} {name}
        </p>
      </div>
    </footer>
  );
}

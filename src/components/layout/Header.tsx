"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { mainNavigation } from "@/data/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type HeaderVariant = "overlay" | "solid";

interface HeaderProps {
  variant?: HeaderVariant;
  siteName: string;
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

function isActivePath(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

export function Header({ variant = "solid", siteName }: HeaderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isOverlay = variant === "overlay";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const headerClass = isOverlay
    ? `fixed inset-x-0 top-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pt-[env(safe-area-inset-top)] ${menuOpen ? "z-[60]" : "z-50"}`
    : menuOpen
      ? "sticky top-0 z-[60] bg-transparent pt-[env(safe-area-inset-top)]"
      : "sticky top-0 z-50 border-b border-border/60 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm supports-[backdrop-filter]:bg-background/90";

  const logoClass =
    isOverlay || menuOpen
      ? "font-display text-xl font-light tracking-wide text-white transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none md:text-2xl"
      : "font-display text-xl font-light tracking-wide text-foreground transition-opacity duration-300 hover:opacity-70 motion-reduce:transition-none md:text-2xl";

  const menuButtonClass =
    isOverlay || menuOpen
      ? "text-white/90 hover:text-white"
      : "text-foreground/80 hover:text-foreground";

  const getNavLinkClass = (href: string) => {
    const active = isActivePath(pathname, href);
    const base =
      "text-sm tracking-[0.12em] uppercase transition-colors duration-300 link-underline motion-reduce:transition-none";

    if (variant === "overlay") {
      return `${base} ${active ? "text-white link-underline-active" : "text-white/90 hover:text-white"}`;
    }

    return `${base} ${active ? "text-foreground link-underline-active" : "text-foreground/80 hover:text-foreground"}`;
  };

  const mobileMenu = (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[55] flex flex-col bg-black/95 pt-[env(safe-area-inset-top)] transition-all duration-500 motion-reduce:transition-none lg:hidden ${
        menuOpen
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      }`}
      aria-hidden={!menuOpen}
    >
      <nav
        className="flex flex-1 flex-col items-center justify-center gap-6 px-6 sm:gap-8"
        aria-label="Navegação mobile"
      >
        {mainNavigation.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-display text-2xl font-light tracking-wide transition-all duration-300 motion-reduce:transition-none sm:text-3xl ${
              isActivePath(pathname, item.href)
                ? "text-white"
                : "text-white/90 hover:text-white"
            }`}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    transitionDelay: menuOpen ? `${index * 50 + 100}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                  }
            }
            aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <header className={headerClass}>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Ir para o conteúdo
      </a>

      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className={logoClass} onClick={() => setMenuOpen(false)}>
          {siteName}
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-8"
          aria-label="Navegação principal"
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={getNavLinkClass(item.href)}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`touch-target relative z-[60] flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 motion-reduce:transition-none lg:hidden ${menuButtonClass}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </header>
  );
}

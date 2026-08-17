"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  isActivePath,
  isNavItemActive,
  mainNavigation,
} from "@/data/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { NavItem } from "@/types/site";

type HeaderVariant = "overlay" | "solid";

interface HeaderProps {
  variant?: HeaderVariant;
  siteName: string;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="10"
      height="10"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

function DesktopPortfolioItem({
  item,
  variant,
  pathname,
  getNavLinkClass,
}: {
  item: NavItem;
  variant: HeaderVariant;
  pathname: string;
  getNavLinkClass: (href: string, active?: boolean) => string;
}) {
  const children = item.children ?? [];
  const submenuId = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const sectionActive = isNavItemActive(pathname, item);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const panelClass =
    variant === "overlay"
      ? "absolute left-0 top-full z-50 min-w-[13rem] border border-white/15 bg-black/90 py-2"
      : "absolute left-0 top-full z-50 min-w-[13rem] border border-border/60 bg-background/95 py-2 backdrop-blur-sm";

  const childClass = (href: string) => {
    const active = isActivePath(pathname, href);
    const base =
      "block px-4 py-2.5 text-sm tracking-[0.12em] uppercase transition-colors duration-300 motion-reduce:transition-none";

    if (variant === "overlay") {
      return `${base} ${active ? "text-white" : "text-white/80 hover:text-white"}`;
    }

    return `${base} ${active ? "text-foreground" : "text-foreground/75 hover:text-foreground"}`;
  };

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${getNavLinkClass(item.href, sectionActive)} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-controls={submenuId}
        aria-haspopup="true"
        onClick={(event) => {
          if (event.detail === 0) {
            setOpen((current) => !current);
            return;
          }
          setOpen(true);
        }}
        onBlur={() => {
          requestAnimationFrame(() => {
            if (!wrapRef.current?.contains(document.activeElement)) {
              setOpen(false);
            }
          });
        }}
      >
        {item.label}
        <Chevron open={open} />
      </button>

      <ul
        id={submenuId}
        className={`${panelClass} ${open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
        hidden={!open}
      >
        {children.map((child) => {
          const active = isActivePath(pathname, child.href);

          return (
            <li key={child.href}>
              <Link
                href={child.href}
                className={childClass(child.href)}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export function Header({ variant = "solid", siteName }: HeaderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isOverlay = variant === "overlay";
  const mobileSubmenuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPortfolioOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setPortfolioOpen(false);
      return;
    }

    const portfolioItem = mainNavigation.find((item) => item.children?.length);
    if (portfolioItem && isNavItemActive(pathname, portfolioItem)) {
      setPortfolioOpen(true);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, pathname]);

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

  const getNavLinkClass = (href: string, activeOverride?: boolean) => {
    const active = activeOverride ?? isActivePath(pathname, href);
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
        className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-16 sm:gap-8"
        aria-label="Navegação mobile"
      >
        {mainNavigation.map((item, index) => {
          const motionStyle = prefersReducedMotion
            ? undefined
            : {
                transitionDelay: menuOpen ? `${index * 50 + 100}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              };

          if (item.children?.length) {
            const sectionActive = isNavItemActive(pathname, item);

            return (
              <div
                key={item.label}
                className="flex w-full max-w-xs flex-col items-center"
                style={motionStyle}
              >
                <button
                  type="button"
                  className={`font-display inline-flex items-center gap-3 text-2xl font-light tracking-wide transition-all duration-300 motion-reduce:transition-none sm:text-3xl ${
                    sectionActive ? "text-white" : "text-white/90 hover:text-white"
                  }`}
                  aria-expanded={portfolioOpen}
                  aria-controls={mobileSubmenuId}
                  onClick={() => setPortfolioOpen((current) => !current)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-lg text-white/70">
                    {portfolioOpen ? "−" : "+"}
                  </span>
                </button>

                <ul
                  id={mobileSubmenuId}
                  className={`flex flex-col items-center gap-3 pt-4 ${portfolioOpen ? "" : "hidden"}`}
                  hidden={!portfolioOpen}
                >
                  {item.children.map((child) => {
                    const active = isActivePath(pathname, child.href);

                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`font-display text-xl font-light tracking-wide transition-colors duration-300 motion-reduce:transition-none ${
                            active ? "text-white" : "text-white/70 hover:text-white"
                          }`}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-2xl font-light tracking-wide transition-all duration-300 motion-reduce:transition-none sm:text-3xl ${
                isActivePath(pathname, item.href)
                  ? "text-white"
                  : "text-white/90 hover:text-white"
              }`}
              style={motionStyle}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
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
          <ul className="flex items-center gap-6 xl:gap-8">
            {mainNavigation.map((item) =>
              item.children?.length ? (
                <DesktopPortfolioItem
                  key={item.label}
                  item={item}
                  variant={variant}
                  pathname={pathname}
                  getNavLinkClass={getNavLinkClass}
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={getNavLinkClass(item.href)}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
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

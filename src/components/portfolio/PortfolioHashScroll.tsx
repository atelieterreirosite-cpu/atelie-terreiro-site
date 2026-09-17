"use client";

import { useEffect } from "react";

/**
 * Em static export, o hash da URL pode não rolar até o alvo após navegação.
 * Este efeito aplica scroll manual respeitando o header fixo.
 */
export function PortfolioHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}

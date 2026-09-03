/**
 * Domínio canônico do frontend público (sem www).
 * WordPress/CMS não é o domínio público do site.
 */
export const SITE_ORIGIN = "https://atelieterreiro.com.br";

/** Garante path público com trailing slash (exceto a home `/`). */
export function publicPath(path: string): string {
  if (path === "/" || path === "") return "/";

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

/** URL absoluta canônica para sitemap e metadados. */
export function absoluteUrl(path: string): string {
  return new URL(publicPath(path), `${SITE_ORIGIN}/`).toString();
}

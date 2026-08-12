const normalizeBaseUrl = (value: string): string => value.trim().replace(/\/+$/, "");

export function getWordPressUrl(): string {
  const value = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!value) {
    throw new Error(
      "NEXT_PUBLIC_WORDPRESS_URL não está definida. Copie .env.example para .env.local antes de executar o projeto.",
    );
  }

  return normalizeBaseUrl(value);
}

export function getPublicWordPressUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  return value ? normalizeBaseUrl(value) : null;
}

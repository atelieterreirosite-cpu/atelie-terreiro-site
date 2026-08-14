/** Helpers de data para adapters de Eventos/Cursos. Não fazem parte do contrato CMS. */

export interface DateParts {
  y: number;
  m: number;
  d: number;
}

export function parseDateParts(value: string | null | undefined): DateParts | null {
  if (!value) return null;
  const text = value.trim();

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (iso) return { y: Number(iso[1]), m: Number(iso[2]), d: Number(iso[3]) };

  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (br) return { y: Number(br[3]), m: Number(br[2]), d: Number(br[1]) };

  const compact = /^(\d{4})(\d{2})(\d{2})$/.exec(text);
  if (compact) return { y: Number(compact[1]), m: Number(compact[2]), d: Number(compact[3]) };

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      y: parsed.getFullYear(),
      m: parsed.getMonth() + 1,
      d: parsed.getDate(),
    };
  }

  return null;
}

export function dateSortKey(value: string | null | undefined, fallback?: string | null): string {
  const parts = parseDateParts(value) ?? parseDateParts(fallback);
  if (!parts) return "0000-00-00";
  return `${parts.y}-${String(parts.m).padStart(2, "0")}-${String(parts.d).padStart(2, "0")}`;
}

export function formatDisplayDate(value: string | null | undefined): string | null {
  const parts = parseDateParts(value);
  if (!parts) return value?.trim() || null;
  return `${String(parts.d).padStart(2, "0")}/${String(parts.m).padStart(2, "0")}/${parts.y}`;
}

export function formatDisplayPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  const startLabel = formatDisplayDate(start);
  const endLabel = formatDisplayDate(end);

  if (startLabel && endLabel && startLabel !== endLabel) {
    return `${startLabel} – ${endLabel}`;
  }
  return startLabel || endLabel || "";
}

export function todaySortKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

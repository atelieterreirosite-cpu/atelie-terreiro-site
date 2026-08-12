import type { CollectionStatus } from "@/lib/cms/models";

interface SectionStatusProps {
  status: CollectionStatus;
  count: number;
}

export function SectionStatus({ status, count }: SectionStatusProps) {
  return (
    <span className={`section-status ${status === "ok" ? "is-ok" : "is-error"}`}>
      <span className="status-dot" aria-hidden="true" />
      {status === "ok" ? `${count} ${count === 1 ? "registro" : "registros"}` : "Falha na API"}
    </span>
  );
}

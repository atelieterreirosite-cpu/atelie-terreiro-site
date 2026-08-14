import type { EventStatus } from "@/types/views";

const statusLabels: Record<EventStatus, string> = {
  futuro: "Em breve",
  "em-andamento": "Em andamento",
  encerrado: "Encerrado",
};

const statusStyles: Record<EventStatus, string> = {
  futuro: "text-foreground bg-foreground/5",
  "em-andamento": "text-accent bg-accent/10",
  encerrado: "text-muted bg-muted/10",
};

interface EventStatusBadgeProps {
  status: EventStatus;
}

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[0.65rem] tracking-[0.14em] uppercase ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

import type { CourseStatus } from "@/types/views";

const statusLabels: Record<CourseStatus, string> = {
  "inscricoes-abertas": "Inscrições abertas",
  "em-andamento": "Em andamento",
  encerrado: "Encerrado",
};

const statusStyles: Record<CourseStatus, string> = {
  "inscricoes-abertas": "text-foreground bg-foreground/5",
  "em-andamento": "text-accent bg-accent/10",
  encerrado: "text-muted bg-muted/10",
};

interface CourseStatusBadgeProps {
  status: CourseStatus;
}

export function CourseStatusBadge({ status }: CourseStatusBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[0.65rem] tracking-[0.14em] uppercase ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

import Image from "next/image";
import Link from "next/link";

import { EditorialText } from "@/components/ui/EditorialText";
import type { CourseModality, CourseView } from "@/types/views";

import { CourseStatusBadge } from "./CourseStatusBadge";

interface CourseDetailProps {
  course: CourseView;
}

const modalityLabels: Record<CourseModality, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
      <dt className="text-xs tracking-[0.12em] text-muted-light uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed text-foreground/90">{value}</dd>
    </div>
  );
}

export function CourseDetail({ course }: CourseDetailProps) {
  const showRegistration =
    course.registration &&
    (course.status === "inscricoes-abertas" || Boolean(course.registration.href));

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10 md:pt-12">
        <Link
          href="/cursos/"
          className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:text-foreground"
        >
          ← Cursos
        </Link>
      </div>

      <header className="mx-auto max-w-4xl px-6 pt-10 md:px-10 md:pt-14">
        <div className="mb-4">
          <CourseStatusBadge status={course.status} />
        </div>

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {course.type ? (
            <p className="text-sm tracking-[0.12em] text-muted-light uppercase">{course.type}</p>
          ) : null}
          {course.modality ? (
            <p className="text-sm text-muted">{modalityLabels[course.modality]}</p>
          ) : null}
        </div>

        <h1 className="font-display mt-4 text-3xl leading-tight font-light tracking-wide text-balance sm:text-4xl md:text-5xl">
          {course.title}
        </h1>
      </header>

      <div className="mx-auto mt-10 max-w-4xl px-6 md:px-10">
        <dl className="space-y-4 border-y border-border py-8">
          {course.period ? <InfoRow label="Período" value={course.period} /> : null}
          {course.modality ? (
            <InfoRow label="Modalidade" value={modalityLabels[course.modality]} />
          ) : null}
          {course.workload ? <InfoRow label="Carga horária" value={course.workload} /> : null}
          {course.audience ? <InfoRow label="Público" value={course.audience} /> : null}
          {course.location ? <InfoRow label="Local" value={course.location} /> : null}
        </dl>
      </div>

      {course.featuredImage ? (
        <div className="mx-auto mt-12 max-w-4xl px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-accent/5">
            <Image
              src={course.featuredImage.src}
              alt={course.featuredImage.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-16 max-w-3xl space-y-12 px-6 md:px-10">
        {course.descriptionText ? (
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Descrição</h2>
            <EditorialText
              text={course.descriptionText}
              className="text-base leading-relaxed text-foreground/90"
            />
          </section>
        ) : null}

        {showRegistration && course.registration ? (
          <section className="space-y-4 border border-border bg-surface p-6 md:p-8">
            <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">Inscrição</h2>
            <p className="text-base text-foreground/90">{course.registration.label}</p>
            {course.registration.note ? (
              <p className="text-sm text-muted">{course.registration.note}</p>
            ) : null}
            {course.registration.href && course.status === "inscricoes-abertas" ? (
              <a
                href={course.registration.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-block pt-2 text-sm tracking-[0.12em] text-foreground uppercase"
              >
                Acessar inscrição →
              </a>
            ) : null}
          </section>
        ) : null}
      </div>
    </article>
  );
}

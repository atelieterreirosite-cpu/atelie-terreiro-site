import Image from "next/image";
import Link from "next/link";

import type { CourseModality, CourseView } from "@/types/views";

import { CourseStatusBadge } from "./CourseStatusBadge";

interface CourseCardProps {
  course: CourseView;
}

const modalityLabels: Record<CourseModality, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group border-t border-border pt-8 first:border-t-0 first:pt-0">
      <Link
        href={`/cursos/${course.slug}/`}
        className="grid gap-5 sm:gap-6 md:grid-cols-[minmax(0,140px)_1fr] md:gap-10"
      >
        <div className="space-y-2 sm:space-y-3">
          <CourseStatusBadge status={course.status} />
          {course.period ? (
            <p className="font-display text-xl leading-tight font-light tracking-wide sm:text-2xl md:text-3xl">
              {course.period}
            </p>
          ) : null}
          {course.workload ? <p className="text-sm text-muted">{course.workload}</p> : null}
        </div>

        <div className="space-y-4">
          {course.featuredImage ? (
            <div className="relative aspect-[16/9] overflow-hidden bg-accent/5 md:hidden">
              <Image
                src={course.featuredImage.src}
                alt={course.featuredImage.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 motion-reduce:transition-none max-md:group-active:scale-[1.01] md:group-hover:scale-[1.02]"
              />
            </div>
          ) : null}

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {course.type ? (
              <p className="text-xs tracking-[0.12em] text-muted-light uppercase">{course.type}</p>
            ) : null}
            {course.modality ? (
              <p className="text-xs text-muted">{modalityLabels[course.modality]}</p>
            ) : null}
          </div>

          <h2 className="font-display text-xl leading-snug font-light tracking-wide transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
            {course.title}
          </h2>

          {course.audience ? (
            <p className="text-sm leading-relaxed text-muted">{course.audience}</p>
          ) : null}

          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">{course.excerpt}</p>

          {course.registration && course.status === "inscricoes-abertas" ? (
            <p className="text-xs tracking-[0.1em] text-foreground/70 uppercase">
              {course.registration.label}
            </p>
          ) : null}

          <span className="link-underline inline-block text-xs tracking-[0.12em] text-foreground/70 uppercase">
            Ver curso
          </span>
        </div>
      </Link>
    </article>
  );
}

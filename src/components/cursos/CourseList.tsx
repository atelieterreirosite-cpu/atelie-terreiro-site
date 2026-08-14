import type { CourseView } from "@/types/views";

import { CourseCard } from "./CourseCard";

interface CourseSectionProps {
  title: string;
  courses: CourseView[];
}

function CourseSection({ title, courses }: CourseSectionProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="space-y-10">
      <h2 className="text-xs tracking-[0.15em] text-muted-light uppercase">{title}</h2>
      <div className="space-y-10">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}

interface CourseListProps {
  open: CourseView[];
  ongoing: CourseView[];
  past: CourseView[];
}

export function CourseList({ open, ongoing, past }: CourseListProps) {
  const isEmpty = open.length === 0 && ongoing.length === 0 && past.length === 0;

  if (isEmpty) {
    return (
      <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
        Nenhum curso para exibir.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-6 pb-20 sm:space-y-20 sm:pb-24 md:px-10">
      <CourseSection title="Inscrições abertas" courses={open} />
      <CourseSection title="Em andamento" courses={ongoing} />
      <CourseSection title="Formações encerradas" courses={past} />
    </div>
  );
}

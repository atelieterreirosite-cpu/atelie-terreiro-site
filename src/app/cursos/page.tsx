import type { Metadata } from "next";

import { CourseList } from "@/components/cursos/CourseList";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { loadCoursesPageForView } from "@/lib/adapters/editorial";
import { loadGroupedCourses } from "@/lib/adapters/course";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cursos",
  description: "Formação e atividades educacionais do Ateliê Terreiro.",
};

export default async function CursosPage() {
  const [{ page }, collection] = await Promise.all([
    loadCoursesPageForView(),
    loadGroupedCourses(),
  ]);

  return (
    <SiteShell>
      <PageHero title={page.title} intro={page.intro} />
      {collection.status === "error" ? (
        <p className="mx-auto max-w-4xl px-6 pb-20 text-sm text-muted md:px-10 md:pb-24">
          Não foi possível carregar os cursos.
        </p>
      ) : (
        <CourseList open={collection.open} ongoing={collection.ongoing} past={collection.past} />
      )}
    </SiteShell>
  );
}

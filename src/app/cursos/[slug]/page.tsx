import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/cursos/CourseDetail";
import { SiteShell } from "@/components/layout/SiteShell";
import { getCourseBySlugForView, getCourseSlugsForStaticParams } from "@/lib/adapters/course";

export const dynamic = "force-static";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCourseSlugsForStaticParams();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlugForView(slug);

  if (!course) {
    return { title: "Curso não encontrado" };
  }

  return {
    title: course.title,
    description: course.excerpt || undefined,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlugForView(slug);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      <CourseDetail course={course} />
    </SiteShell>
  );
}

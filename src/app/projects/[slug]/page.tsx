import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/project/project-detail";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllProjectSlugs();
    return slugs.map((row) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <ProjectDetailView project={project} />
    </div>
  );
}

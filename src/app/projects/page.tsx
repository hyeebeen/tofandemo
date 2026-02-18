import { getPublishedProjects } from "@/lib/queries";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return <ProjectsClient projects={projects} />;
}

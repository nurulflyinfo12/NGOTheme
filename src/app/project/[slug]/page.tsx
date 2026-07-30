import DanboxLayout from "@/layout/DanboxLayout";
import projects from "@/app/data/project.json";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const ProjectDetails = ({ params }: Props) => {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <DanboxLayout>
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

          <p className="text-yellow-600 font-semibold mb-6">
            {project.category}
          </p>

          <h3 className="text-xl font-semibold mb-3">
            {project.fullName}
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            {project.description}
          </p>

        </div>
      </section>
    </DanboxLayout>
  );
};

export default ProjectDetails;
import { CompanyRow, type Company } from "./CompanyRow";
import { CourseIcon } from "../icons/CourseIcon";
import { DatabaseIcon } from "../icons/DatabaseIcon";
import { DocIcon } from "../icons/DocIcon";
import { LayersIcon } from "../icons/LayersIcon";
import { MobileIcon } from "../icons/MobileIcon";
import { NodeTreeIcon } from "../icons/NodeTreeIcon";
import { RocketIcon } from "../icons/RocketIcon";
import { SendIcon } from "../icons/SendIcon";
import { ServerIcon } from "../icons/ServerIcon";
import { SparkleIcon } from "../icons/SparkleIcon";

const work: Company[] = [
  {
    company: "roadmap.sh",
    tagline: "Developer Roadmaps",
    logo: "/logos/roadmap.svg",
    startDate: "2023",
    works: [
      {
        name: "Lesson Packs",
        tagline: "Bite-sized lessons with progress & chat",
        icon: LayersIcon,
        href: "https://roadmap.sh/packs",
      },
      {
        name: "Back-office Monolith",
        tagline: "Containerized admin & content platform",
        icon: ServerIcon,
      },
      {
        name: "iOS App",
        tagline: "Native app with AI chat & purchases",
        icon: MobileIcon,
      },
      {
        name: "Platform Migration",
        tagline: "Rebuilt the platform on a modern stack",
        icon: RocketIcon,
        href: "/writings/the-better-migration",
        linkLabel: "Read the write-up",
        date: "Jan 2025",
        description: (
          <p>
            Migrated the platform from Astro to a modern React Router + TanStack
            Query stack, cutting <em>build times by 40%</em> while improving
            page loads and developer experience.
          </p>
        ),
      },
      {
        name: "AI Tutor",
        tagline: "AI tutoring across topics & roadmaps",
        icon: SparkleIcon,
        href: "https://roadmap.sh/ai",
      },
      {
        name: "Course Platform",
        tagline: "Interactive courses with in-browser SQL",
        icon: CourseIcon,
        href: "https://roadmap.sh/courses/sql",
      },
      {
        name: "Roadmaps Editor",
        tagline: "Create, fork & share your own roadmaps",
        icon: NodeTreeIcon,
        href: "https://draw.roadmap.sh",
        date: "Sep 2023",
        description: (
          <p>
            A custom editor that replaced our manual Balsamiq workflow. A
            roadmap that once took{" "}
            <strong>~2 days to assemble now takes 4-5 hours</strong>, with zero
            upkeep after an edit. Users have built <em>300k+</em> of their own
            since.
          </p>
        ),
      },
      {
        name: "Scoop",
        tagline: "Email platform with segmentation at scale",
        icon: SendIcon,
        date: "Oct 2023",
        description:
          "An email platform built from the ground up, with audience segmentation, automations, and throttled high-volume sends. Since retired for a managed provider, but it ran our newsletters at scale for years.",
      },
    ],
  },
  {
    company: "Towards Data Science",
    tagline: "Home for Data Science and AI",
    logo: "/logos/tds.png",
    startDate: "2026",
    works: [
      {
        name: "Editorial CMS",
        tagline: "Rich-text publishing with collaboration",
        icon: DocIcon,
      },
      {
        name: "WordPress Migration",
        tagline: "Moved the publication off WordPress",
        icon: DatabaseIcon,
      },
    ],
  },
];

type WorkSectionProps = {};

export function WorkSection(props: WorkSectionProps) {
  return (
    <section className="-mx-1">
      <h2 className="mb-2 ml-1 text-zinc-500">Work</h2>
      <div className="flex flex-col divide-y divide-zinc-100">
        {work.map((company) => (
          <CompanyRow key={company.company} company={company} />
        ))}
      </div>
    </section>
  );
}

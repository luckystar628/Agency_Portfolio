interface RelatedProjectsProps {
  projects: ProjectDetails[];
}

interface ProjectDetails {
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string[];
  images: string[];
  timestamp: string;
}

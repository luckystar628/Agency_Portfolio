interface ProjectDetails {
    slug: string;
    title: string;
    category: string;
    description: string;
    fullDescription: string[];
    images: string[];
    timestamp: string;
}

interface RelatedProjectsProps {
    projects: ProjectDetails[];
}
import Link from 'next/link'

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Link 
              href={`/projects/${project.slug}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}


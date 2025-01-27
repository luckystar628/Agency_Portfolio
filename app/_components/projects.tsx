'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { projectsData } from '../_data/projectData'

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", ...new Set(projectsData.map(project => project.category))]

  const filteredProjects = projectsData
    .filter(project => activeCategory === "All" || project.category === activeCategory)
    .filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  const clearSearch = () => {
    setSearchQuery("")
  }
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-5xl font-bold mb-4">Explore Recent Projects</h2>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover innovative solutions and success stories from With Gru. Our portfolio showcases cutting-edge projects that demonstrate our expertise in creating impactful digital experiences.
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full my-4">
          <div className="flex gap-8 overflow-x-auto pb-2 md:pb-0 border-b border-gray-200 dark:border-gray-700">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-2 py-4 relative ${
                  activeCategory === category 
                    ? 'font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black dark:after:bg-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-400 dark:border-gray-700 rounded-lg bg-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium mb-2 opacity-75">{project.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-70">{project.description.split(". ")[0]}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


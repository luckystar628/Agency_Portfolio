"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import RelatedProjects from "@/app/_components/projects/RelatedProjects"
import BookingModal from "@/app/_components/bookingModal"
import { projectsData } from "@/app/_data/projectData"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const nextImage = useCallback(() => {
    if (projectDetails) {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % projectDetails.images.length)
    }
  }, [projectDetails])

  const prevImage = useCallback(() => {
    if (projectDetails) {
      setActiveImageIndex((prevIndex) => (prevIndex - 1 + projectDetails.images.length) % projectDetails.images.length)
    }
  }, [projectDetails])

  useEffect(() => {
    if (projectDetails) {
      const intervalId = setInterval(nextImage, 15000) // Changed to 15 seconds
      return () => clearInterval(intervalId)
    }
  }, [nextImage, projectDetails])

  useEffect(() => {
    const project = projectsData.find((p) => p.slug === params.slug)
    if (project) {
      setProjectDetails(project)
    }
    setIsLoading(false)
  }, [params.slug])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!projectDetails) {
    return <div>Project not found</div>
  }

  const relatedProjects = projectsData
    .filter((p) => p.category === projectDetails.category && p.slug !== projectDetails.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        
        {/* Hero Section */}
        <section id="overview" className="">
          <div className="container mx-auto px-6 pt-20 pb-10 border-b">
            <div className="max-w-4xl">
              <span className="text-blue-600 font-medium">
                {projectDetails.category}
              </span>
              <h1 className="text-5xl font-bold mt-2 mb-6">
                {projectDetails.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xl mb-8">
                {projectDetails.description.split(".")[0]}
              </p>
              <Link
                href="/#contact"
                className="bg-black dark:bg-gray-200  text-white dark:text-gray-950 px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-block"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Back button */}
        <div className="container mx-auto px-6 py-8">
          <Link
            href="/#projects"
            className="inline-flex items-center  text-gray-900 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        {/* Project Images */}
        {projectDetails && (
          <section className="container mx-auto px-6 py-20">
            <div className="relative h-[60vh] overflow-hidden">
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 z-10 hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 z-10 hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              {projectDetails.images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 flex flex-row justify-center items-center gap-4 ${
                    index === activeImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-1/6 h-1/3 overflow-hidden">
                    <img
                      src={
                        projectDetails.images[
                          (index - 1 + projectDetails.images.length) % projectDetails.images.length
                        ] || "/placeholder.svg"
                      }
                      alt={`Project preview ${index + 1}`}
                      className="object-cover w-full h-full filter brightness-50"
                    />
                  </div>
                  <div className="h-full">
                    <img
                      src={image || "/placeholder.svg"} 
                      alt={`Project image ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="w-1/6 h-1/3 overflow-hidden">
                    <img
                      src={
                        projectDetails.images[
                          (index + 1) % projectDetails.images.length
                        ] || "/placeholder.svg"
                      }
                      alt={`Project preview ${index + 1}`}
                      className="object-cover w-full h-full filter brightness-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Description */}
        <section id="description" className="container mx-auto px-6 py-6 pb-10 mb-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center border-b border-gray-200">
            {/* <h2 className="text-3xl font-bold mb-8">Project Details</h2> */}
            <p className="text-2xl mb-8">{projectDetails.description}</p>
          </div>
        </section>
              
        <section id="details" className="container mx-auto px-6 py-20 ">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            {projectDetails.fullDescription.map((paragraph, index) => (
              <div key={index} className="mb-2 pb-10 border-b border-gray-200 last:border-0">
                <p className="text-xl font-bold leading-relaxed">{paragraph.split(":")[0]}</p>
                <p className=" text-lg leading-relaxed">{paragraph.split(":")[1]}</p>
              </div>
            ))}
            <div className="text-sm flex justify-end w-full"><span>{projectDetails.timestamp}</span></div>
          </div>
        </section>

        {/* Related Projects */}
        <section id="related" className=" py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
            <RelatedProjects projects={relatedProjects} />
          </div>
        </section>

        {/* CTA Section */}
        <section className=" py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Let's Create Something Amazing Together</h2>
              <p className="text-gray-600 text-lg mb-8">
                Boost your online growth with With Gru! Let our expert team transform your digital presence and drive
                your business forward. Start today!
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Book a Call
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


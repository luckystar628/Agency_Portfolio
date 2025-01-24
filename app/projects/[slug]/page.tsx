"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/app/_components/header"
import RelatedProjects from "@/app/_components/projects/RelatedProjects"
import BookingModal from "@/app/_components/bookingModal"

interface ProjectDetails {
  slug: string
  title: string
  category: string
  description: string
  fullDescription: string[]
  images: string[]
  timestamp: string
}

const projectsData: ProjectDetails[] = [
  {
    slug: "e-commerce-platform",
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A fully responsive online store with advanced features and seamless user experience.",
    fullDescription: [
      "Our e-commerce platform is designed to provide a seamless shopping experience for customers and an easy-to-manage backend for store owners.",
      "We implemented advanced features such as real-time inventory management, personalized product recommendations, and a streamlined checkout process.",
      "The platform is built with scalability in mind, allowing businesses to grow their online presence without worrying about technical limitations.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on February 15, 2024",
  },
  {
    slug: "decentralized-exchange",
    title: "Decentralized Exchange",
    category: "Blockchain Development",
    description: "A secure and efficient platform for trading cryptocurrencies without intermediaries.",
    fullDescription: [
      "Our decentralized exchange (DEX) leverages blockchain technology to provide a trustless and transparent trading environment.",
      "We implemented advanced features such as atomic swaps, liquidity pools, and yield farming to attract and retain users.",
      "The platform's smart contracts have undergone rigorous security audits to ensure the safety of users' funds and transactions.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on March 1, 2024",
  },
  {
    slug: "ai-powered-chatbot",
    title: "AI-Powered Chatbot",
    category: "AI Solution",
    description: "An intelligent conversational AI for customer support and engagement.",
    fullDescription: [
      "Our AI-powered chatbot uses natural language processing and machine learning to provide human-like interactions with customers.",
      "The chatbot is trained on a vast dataset of customer inquiries and can handle a wide range of topics, from product information to troubleshooting.",
      "We implemented features such as sentiment analysis and context awareness to provide more personalized and effective responses.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on March 15, 2024",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "A fully responsive online store with advanced features and seamless user experience.",
    fullDescription: [
      "Our e-commerce platform is designed to provide a seamless shopping experience for customers and an easy-to-manage backend for store owners.",
      "We implemented advanced features such as real-time inventory management, personalized product recommendations, and a streamlined checkout process.",
      "The platform is built with scalability in mind, allowing businesses to grow their online presence without worrying about technical limitations.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on February 15, 2024",
  },
  {
    slug: "nft-marketplace",
    title: "Decentralized Exchange",
    category: "Web Development",
    description: "A secure and efficient platform for trading cryptocurrencies without intermediaries.",
    fullDescription: [
      "Our decentralized exchange (DEX) leverages blockchain technology to provide a trustless and transparent trading environment.",
      "We implemented advanced features such as atomic swaps, liquidity pools, and yield farming to attract and retain users.",
      "The platform's smart contracts have undergone rigorous security audits to ensure the safety of users' funds and transactions.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on March 1, 2024",
  },
  {
    slug: "predictive-analytics-tool",
    title: "AI-Powered Chatbot",
    category: "AI Solution",
    description: "An intelligent conversational AI for customer support and engagement.",
    fullDescription: [
      "Our AI-powered chatbot uses natural language processing and machine learning to provide human-like interactions with customers.",
      "The chatbot is trained on a vast dataset of customer inquiries and can handle a wide range of topics, from product information to troubleshooting.",
      "We implemented features such as sentiment analysis and context awareness to provide more personalized and effective responses.",
    ],
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "/placeholder1.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png",
      "placeholder2.jpg",
    ],
    timestamp: "Posted on March 15, 2024",
  },
]

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

        {/* Hero Section */}
        <section id="overview" className="bg-gray-50">
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl">
              <span className="text-blue-600 font-medium">{projectDetails.category}</span>
              <h1 className="text-5xl font-bold mt-2 mb-6">{projectDetails.title}</h1>
              <p className="text-gray-600 text-xl mb-8">{projectDetails.description}</p>
              <Link
                href="/#contact"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-block"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

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
                  className={`absolute inset-0 flex transition-opacity duration-1000 ${
                    index === activeImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-1/6 overflow-hidden">
                    <img
                      src={
                        projectDetails.images[
                          (index - 1 + projectDetails.images.length) % projectDetails.images.length
                        ] || "/placeholder.svg"
                      }
                      alt={`Project preview ${index + 1}`}
                      className="object-cover w-full h-full filter blur-sm brightness-75"
                    />
                  </div>
                  <div className="w-2/3">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Project image ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="w-1/6 overflow-hidden">
                    <img
                      src={projectDetails.images[(index + 1) % projectDetails.images.length] || "/placeholder.svg"}
                      alt={`Project preview ${index + 1}`}
                      className="object-cover w-full h-full filter blur-sm brightness-75"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Description */}
        <section id="details" className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {projectDetails.fullDescription.map((paragraph, index) => (
              <div key={index} className="mb-12 pb-12 border-b border-gray-200 last:border-0">
                <p className="text-gray-600 text-lg leading-relaxed">{paragraph}</p>
              </div>
            ))}
            <p className="text-sm text-gray-500">{projectDetails.timestamp}</p>
          </div>
        </section>

        {/* Related Projects */}
        <section id="related" className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
            <RelatedProjects projects={relatedProjects} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Let's Create Something Amazing Together</h2>
              <p className="text-gray-600 text-lg mb-8">
                Boost your online growth with Appifyo! Let our expert team transform your digital presence and drive
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


'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import RelatedProjects from '@/app/_components/projects/RelatedProjects';

const projectsData: ProjectDetails[] = [
  {
    slug: "e-commerce-platform",
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A fully responsive online store with advanced features and seamless user experience.",
    fullDescription: [
      "Our e-commerce platform is designed to provide a seamless shopping experience for customers and an easy-to-manage backend for store owners.",
      "We implemented advanced features such as real-time inventory management, personalized product recommendations, and a streamlined checkout process.",
      "The platform is built with scalability in mind, allowing businesses to grow their online presence without worrying about technical limitations."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on February 15, 2024"
  },
  {
    slug: "decentralized-exchange",
    title: "Decentralized Exchange",
    category: "Blockchain Development",
    description: "A secure and efficient platform for trading cryptocurrencies without intermediaries.",
    fullDescription: [
      "Our decentralized exchange (DEX) leverages blockchain technology to provide a trustless and transparent trading environment.",
      "We implemented advanced features such as atomic swaps, liquidity pools, and yield farming to attract and retain users.",
      "The platform's smart contracts have undergone rigorous security audits to ensure the safety of users' funds and transactions."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on March 1, 2024"
  },
  {
    slug: "ai-powered-chatbot",
    title: "AI-Powered Chatbot",
    category: "AI Solution",
    description: "An intelligent conversational AI for customer support and engagement.",
    fullDescription: [
      "Our AI-powered chatbot uses natural language processing and machine learning to provide human-like interactions with customers.",
      "The chatbot is trained on a vast dataset of customer inquiries and can handle a wide range of topics, from product information to troubleshooting.",
      "We implemented features such as sentiment analysis and context awareness to provide more personalized and effective responses."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on March 15, 2024"
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "A fully responsive online store with advanced features and seamless user experience.",
    fullDescription: [
      "Our e-commerce platform is designed to provide a seamless shopping experience for customers and an easy-to-manage backend for store owners.",
      "We implemented advanced features such as real-time inventory management, personalized product recommendations, and a streamlined checkout process.",
      "The platform is built with scalability in mind, allowing businesses to grow their online presence without worrying about technical limitations."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on February 15, 2024"
  },
  {
    slug: "nft-marketplace",
    title: "Decentralized Exchange",
    category: "Web Development",
    description: "A secure and efficient platform for trading cryptocurrencies without intermediaries.",
    fullDescription: [
      "Our decentralized exchange (DEX) leverages blockchain technology to provide a trustless and transparent trading environment.",
      "We implemented advanced features such as atomic swaps, liquidity pools, and yield farming to attract and retain users.",
      "The platform's smart contracts have undergone rigorous security audits to ensure the safety of users' funds and transactions."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on March 1, 2024"
  },
  {
    slug: "predictive-analytics-tool",
    title: "AI-Powered Chatbot",
    category: "AI Solution",
    description: "An intelligent conversational AI for customer support and engagement.",
    fullDescription: [
      "Our AI-powered chatbot uses natural language processing and machine learning to provide human-like interactions with customers.",
      "The chatbot is trained on a vast dataset of customer inquiries and can handle a wide range of topics, from product information to troubleshooting.",
      "We implemented features such as sentiment analysis and context awareness to provide more personalized and effective responses."
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6QBaTOI7CmwQ9IdUEc0QPV7jarirXR.png"],
    timestamp: "Posted on March 15, 2024"
  }
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)

  useEffect(() => {
    const project = projectsData.find(p => p.slug === params.slug)
    if (project) {
      setProjectDetails(project)
    }
  }, [params.slug])

  if (!projectDetails) {
    return <div>Project not found</div>
  }

  const relatedProjects = projectsData
    .filter(p => p.category === projectDetails.category && p.slug !== projectDetails.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        {/* Back button */}
        <div className="container mx-auto px-6 py-8">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 gap-8">
            {projectDetails.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        </section>

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
                Boost your online growth with Appifyo! Let our expert team transform your digital presence 
                and drive your business forward. Start today!
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


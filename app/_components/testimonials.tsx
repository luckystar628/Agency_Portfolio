'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Tech Innovators",
    content: "CodeCatalyst transformed our digital presence. Their expertise in web development and AI solutions gave us a competitive edge in the market.",
    image: "/placeholder.jpg"
  },
  {
    name: "Jane Smith",
    role: "Marketing Director, Global Reach",
    content: "The blockchain solution provided by CodeCatalyst revolutionized our supply chain management. Their team's professionalism and technical prowess are unmatched.",
    image: "/placeholder.jpg"
  },
  {
    name: "Mike Johnson",
    role: "Founder, StartUp Success",
    content: "From concept to execution, CodeCatalyst delivered beyond our expectations. Their holistic approach to digital solutions truly sets them apart.",
    image: "/placeholder.jpg"
  },
  {
    name: "Emily Brown",
    role: "CTO, InnovateTech",
    content: "CodeCatalyst's AI solutions have dramatically improved our operational efficiency. Their innovative approach to problem-solving is truly commendable.",
    image: "/placeholder.jpg"
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!isHovered) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isHovered])

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovered(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 rounded-full p-2 shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            ref={containerRef}
            className="flex overflow-x-hidden"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className={`w-full md:w-1/2 flex-shrink-0 px-4 transition-all duration-300 ease-in-out transform`}
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <p className="text-lg italic mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="flex items-center">
                      <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 rounded-full p-2 shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex % testimonials.length || index === (activeIndex + 1) % testimonials.length
                  ? 'bg-blue-500'
                  : 'bg-blue-400 bg-opacity-40'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


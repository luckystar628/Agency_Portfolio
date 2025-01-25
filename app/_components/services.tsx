'use client'

import { useEffect, useRef } from 'react'
import { services } from '../_data/servicesData'

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('animate-fade-in-up')
  //         }
  //       })
  //     },
  //     { threshold: 0.1 }
  //   )

  //   const serviceElements = sectionRef.current?.querySelectorAll('.service-item')
  //   serviceElements?.forEach((el) => observer.observe(el))

  //   return () => observer.disconnect()
  // }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="service-item opacity-100 transform translate-y-4 transition-all duration-500 ease-out bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


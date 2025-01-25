'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import FlowingText from './flowingText'
import { set } from 'date-fns'
import { useTheme } from './ThemeProvider'

const AnimatedCounter = ({ end, label }: { end: number, label: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepTime = duration / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += 1
        setCount(Math.floor((current / steps) * end))
        
        if (current >= steps) {
          setCount(end)
          clearInterval(timer)
        }
      }, stepTime)

      return () => clearInterval(timer)
    }
  }, [inView, end])

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center">
        <span className="text-3xl font-bold">{count}</span>
        <span className="text-3xl font-bold text-orange-500 ml-2">+</span>
      </div>
      <p className="text-orange-600 dark:text-orange-300 mt-2">{label}</p>
    </div>
  )
}

export default function HeroSection() {
  const { toggleBookingModal } = useTheme()

  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const description = descriptionRef.current

    if (title && description) {
      title.style.opacity = '0'
      title.style.transform = 'translateY(20px)'
      description.style.opacity = '0'
      description.style.transform = 'translateY(20px)'

      setTimeout(() => {
        title.style.transition = 'opacity 0.8s, transform 0.8s'
        title.style.opacity = '1'
        title.style.transform = 'translateY(0)'

        setTimeout(() => {
          description.style.transition = 'opacity 0.8s, transform 0.8s'
          description.style.opacity = '1'
          description.style.transform = 'translateY(0)'
        }, 400)
      }, 100)
    }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
      <div className="container mx-auto px-6 text-center">
        <div>
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mt-32 mb-6 leading-tight">
            Forging Digital Excellence<br />With Design, Development & Marketing
          </h1>
          <p ref={descriptionRef} className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            CodeCatalyst delivers custom digital solutions, blending design, development, and marketing to drive growth, amplify impact, and realize your vision.
          </p>
        </div>
        <div className='flex items-center justify-center gap-8 pt-8'>
          <div className='flex flex-col w-2/3 gap-8'>
            <div className="text-2xl">
              With 10+ years of experience, we elevate your digital presence through innovative design, branding, development, and marketing solutions.
            </div>
            <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
                <AnimatedCounter end={200} label="Happy Clients" />
                <AnimatedCounter end={350} label="Projects Completed" />
            </div>
          </div>
          <div>
            <img src='/placeholder.jpg' alt="Hero Image" className="w-full max-w-md mx-auto" />
          </div>
        </div>
        <div className="space-x-4 pt-24">
        <a className="inline-block bg-white text-blue-500 px-8 py-3 rounded-full cursor-pointer font-semibold hover:bg-opacity-90 transition-colors" onClick={() => toggleBookingModal()}>
            Book a Call
          </a>
          <a href="#services" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
            Get Started
          </a>
        </div>
      </div>
      <FlowingText/>
    </section>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import Link from 'next/link'


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = ['hero', 'services', 'projects', 'testimonials', 'pricing', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // const scrollToSection = (sectionId: string) => {
  //   console.log("sectionId", sectionId);
  //   const element = document.getElementById(sectionId)
  //   if (element) {
  //     const offset = 100 // Increased offset for taller header
  //     const elementPosition = element.getBoundingClientRect().top
  //     const offsetPosition = elementPosition + window.pageYOffset - offset

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth'
  //     })
  //   }
  // }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 mt-3 `}
    >
      <nav 
        className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled 
            ? 'w-[50%] bg-[#111111]/90 text-white rounded-2xl backdrop-blur-sm py-1 px-4' 
            : 'w-[80%] bg-white text-black py-2 px-8 rounded-2xl shadow-lg'
        }`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg font-bold text-lg opercity-50 hover:opacity-100 transition-opacity">
            ///
          </div>
        </Link>
        
        <div className="flex items-center space-x-10">
          <Link href={`/`} className="relative group">
            <button 
              // onClick={() => scrollToSection('services')}
              className="flex items-center space-x-1 hover:opacity-80 transition-opacity text-base"
            >
              <span>Services</span>
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Link>
          
          {[
            { name: 'Projects', id: 'projects' },
            { name: 'Blogs', id: 'testimonials' },
            { name: 'Contact', id: 'contact' },
            { name: 'About', id: 'details' }
          ].map((item) => (
            <Link href={`/#${item.id}`}>
            <button 
              key={item.name}
              // onClick={() => scrollToSection(item.id)}
              className="hover:opacity-80 transition-opacity text-base"
            >
              {item.name}
            </button>
            </Link>
          ))}
          
          <button
            // onClick={() => scrollToSection('contact')}
            className={`px-8 py-3 rounded-full transition-all duration-300 text-base font-medium ${
              isScrolled
                ? 'bg-white text-[#111111] hover:bg-opacity-90'
                : 'bg-black text-white hover:bg-opacity-90'
            }`}
          >
            Book a call
          </button>
        </div>
      </nav>
    </header>
  )
}


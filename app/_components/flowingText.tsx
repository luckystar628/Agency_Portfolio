'use client'

import { useEffect, useRef, useState } from 'react'

export default function FlowingText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => setIsHovered(true);
  // const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateAnimation = () => {
      const containerWidth = container.offsetWidth
      const firstLine = container.querySelector('.first-line') as HTMLDivElement
      const secondLine = container.querySelector('.second-line') as HTMLDivElement

      if (firstLine && secondLine) {
        firstLine.style.setProperty('--scroll-width', `${containerWidth}px`)
        secondLine.style.setProperty('--scroll-width', `${containerWidth}px`)
      }
    }

    updateAnimation()
    window.addEventListener('resize', updateAnimation)

    return () => {
      window.removeEventListener('resize', updateAnimation)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden py-20 bg-gradient-to-r from-blue-500/10 to-blue-500/5"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <style jsx>{`
        @keyframes scrollRight {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollLeft {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .flowing-text {
          display: inline-block;
          white-space: nowrap;
          padding-right: 50px;
        }
      `}</style>
      <div className="relative">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div 
            className={`flex ${isHovered ? 'animate-none' : 'animate-[scrollLeft_30s_linear_infinite]'}`}
          >
            <span className="flowing-text text-6xl font-bold text-white/80">
              STRENGTHENING BRANDS THROUGH INNOVATIVE WEB & APP DEVELOPMENT, CREATIVE DESIGNS, SEO, AND STRATEGIC MARKETING
            </span>
            <span className="flowing-text text-6xl font-bold text-white/80">
              STRENGTHENING BRANDS THROUGH INNOVATIVE WEB & APP DEVELOPMENT, CREATIVE DESIGNS, SEO, AND STRATEGIC MARKETING
            </span>
          </div>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden mt-4">
          <div 
            className={`flex ${isHovered ? 'animate-none' : 'animate-[scrollRight_30s_linear_infinite]'}`}
          >
            <span className="flowing-text text-6xl font-bold text-white/80">
              INNOVATIVE WEB & APP DEVELOPMENT, CREATIVE DESIGNS, SEO, AND STRATEGIC MARKETING FOR YOUR SUCCESS
            </span>
            <span className="flowing-text text-6xl font-bold text-white/80">
              INNOVATIVE WEB & APP DEVELOPMENT, CREATIVE DESIGNS, SEO, AND STRATEGIC MARKETING FOR YOUR SUCCESS
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


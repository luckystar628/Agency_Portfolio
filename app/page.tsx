"use client"
import HeroSection from './_components/hero'
import ServicesSection from './_components/services'
import ProjectsSection from './_components/projects'
import TestimonialsSection from './_components/testimonials'
import PricingSection from './_components/pricing'
import ContactSection from './_components/contact'
import BookingModal from './_components/bookingModal'
import { useTheme } from './_components/ThemeProvider'

export default function Home() {
  const {isOpenBookingModal} = useTheme()
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      {isOpenBookingModal && 
        <BookingModal/>
      }
    </>
  )
}


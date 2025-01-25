"use client"
import HeroSection from './_components/hero'
import ServicesSection from './_components/services'
import ProjectsSection from './_components/projects'
import TestimonialsSection from './_components/testimonials'
import PricingSection from './_components/pricing'
import ContactSection from './_components/contact'
import BookingModal from './_components/bookingModal'
import { useState } from 'react'

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openModal = () => setIsBookingModalOpen(true);

  const closeModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <BookingModal/>
    </>
  )
}


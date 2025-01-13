'use client'

import { useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, ClockIcon } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Add Calendly script when component mounts
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-6xl bg-white rounded-2xl shadow-xl flex">
          {/* Left Section */}
          <div className="w-1/2 p-12">
            <h2 className="text-4xl font-bold mb-4">Let's Meet</h2>
            <p className="text-gray-600 mb-8">
              We are always excited to meet new people and discuss new projects. 
              Please feel free to book a meeting with us.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Design + Development + Marketing</h3>
                  <p className="text-gray-500">Turn your ideas into reality with our development and design services.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Free Consultation</h3>
                  <p className="text-gray-500">Get expert advice on how to improve your business and increase your online presence.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Technical Support</h3>
                  <p className="text-gray-500">Get technical support for your website or application.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Calendly Integration */}
          <div className="w-1/2 bg-gray-50 p-12 rounded-r-2xl relative">
            <div className="absolute top-4 right-4 bg-black/90 text-white text-xs py-1.5 px-3 rounded-full transform rotate-12 font-medium">
              Powered by Calendly
            </div>

            {/* Calendly Inline Widget */}
            <div 
              className="calendly-inline-widget" 
              data-url="YOUR_CALENDLY_URL"
              style={{ 
                minWidth: '320px',
                height: '700px',
              }}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}


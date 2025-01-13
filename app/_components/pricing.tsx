'use client'

import { useRouter } from 'next/navigation'

export default function PricingSection() {
  const router = useRouter()

  const plans = [
    {
      name: "Basic",
      price: "$999",
      features: [
        "Modern website design essentials",
        "Implementation with clean and optimized code",
        "Basic SEO for online visibility",
        "Logo creation",
        "Social Media setup",
        "Basic hybrid mobile app"
      ]
    },
    {
      name: "Growth",
      price: "$2,499",
      features: [
        "Custom Website Design",
        "Custom Website Development",
        "Data-Driven Marketing Strategies",
        "Advanced SEO Optimization",
        "Branding and Stationery & Visual Consistency",
        "Social Media Management",
        "Feature-Rich Mobile App Development"
      ]
    },
    {
      name: "Ultimate",
      price: "$4,999",
      features: [
        "Enterprise-level Custom Solutions",
        "Full-stack Web and Mobile Development",
        "AI-powered Chatbots and Automation",
        "Blockchain Integration",
        "Comprehensive Digital Marketing Campaigns",
        "24/7 Priority Support",
        "Quarterly Strategy Reviews and Optimization"
      ]
    }
  ]

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-blue-400 to-violet-900 text-white py-2 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}




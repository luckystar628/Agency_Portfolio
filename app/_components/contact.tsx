"use client"

import type React from "react"
import { useEffect, useState, type FormEvent } from "react"

import emailjs from "@emailjs/browser";


const public_key = "aDqVljl7xqfsTxiw4";
const service_id = "service_52h0qat";
const template_id = "template_j494u0g";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const timer = async () => {
      if (status) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setStatus('idle');
      }
    };
  
    timer();
  }, [status]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      emailjs.send(service_id, template_id, formData, public_key).then(
        () => {
          setStatus("success");
        },
        () => {
          setStatus("error");
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Here you would typically send the formData to your backend
      console.log("Form submitted:", formData)
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md w-full">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Contact Us</h2>
        </div>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {status === "success" && (
          <div className="mt-4 text-sm text-green-600 bg-green-100 border border-green-400 rounded-md p-3 animate-fade-in-down">
            Thank you for your message. We'll get back to you soon!
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-3 animate-fade-in-down">
            Oops! Something went wrong. Please try again later.
          </div>
        )}
      </div>
    </div>
  )
}


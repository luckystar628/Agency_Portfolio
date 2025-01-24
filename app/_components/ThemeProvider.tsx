'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<{
  isDarkMode: boolean
  isBookingModalOpen: boolean
  toggleDarkMode: () => void
}>({
  isDarkMode: false,
  isBookingModalOpen: false,
  toggleDarkMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);


  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, isBookingModalOpen, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}


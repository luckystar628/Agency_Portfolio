import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './_components/header'
import Footer from './_components/footer'
import ThemeProvider from './_components/ThemeProvider'
import BookingModal from './_components/bookingModal'
import DarkModeToggle from './_components/darkModeToogle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Appifyo - IT Agency',
  description: 'Forging Digital Excellence With Design, Development & Marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Header /> 
          <div className="fixed right-8 top-8 z-50"> 
            <DarkModeToggle />
          </div>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


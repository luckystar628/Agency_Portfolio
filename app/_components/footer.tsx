export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Appifyo</h3>
            <p className="text-sm">Forging Digital Excellence With Design, Development & Marketing</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-theme-light transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">Blockchain Development</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">AI Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-theme-light transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-theme-light transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-theme-light transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Appifyo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


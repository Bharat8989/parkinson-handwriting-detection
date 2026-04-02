import React, { useState, useEffect } from 'react'
import { Brain, User, LogOut } from 'lucide-react'

const Navbar = ({ isAuthenticated, userEmail, onLoginClick, onSignupClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Brain className="w-6 h-6 text-white" strokeWidth={3} style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' }} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-[#1E293B]">
              NeuroPredict
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#1E293B] hover:text-primary font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-[#1E293B] hover:text-primary font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('upload')}
              className="text-[#1E293B] hover:text-primary font-medium transition-colors"
            >
              Upload
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#1E293B] hover:text-primary font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#1E293B] hover:text-primary font-medium transition-colors"
            >
              Contact
            </button>
            
            {/* Login/Profile Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline">{userEmail?.split('@')[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onLoginClick}
                  className="bg-white hover:bg-gray-50 text-primary px-4 py-2.5 rounded-lg font-medium transition-all border-2 border-primary flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6 text-[#1E293B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


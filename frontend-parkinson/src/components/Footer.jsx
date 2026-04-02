import React from 'react'
import { Brain } from 'lucide-react'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-[#1E293B]">
                NeuroPredict
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md">
              AI-powered early detection system for Parkinson's disease using
              advanced deep learning models (CNN + LSTM).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Research Papers</li>
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Support</li>
            </ul>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              <span className="text-red-600 font-medium">Important:</span> This is not a diagnostic tool. Please consult healthcare professionals for medical diagnosis.
            </p>
            <p className="text-center text-gray-500 text-sm">
              © 2025 NeuroPredict. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


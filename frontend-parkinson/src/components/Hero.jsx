import React, { useState, useEffect } from 'react'
import { Upload, BookOpen } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // All 3 images from the folder
  const carouselImages = [
    {
      url: '/images/Gemini_Generated_Image_8b70dc8b70dc8b70.png',
      alt: 'Living with Parkinson\'s: Daily Support & Wellness'
    },
    {
      url: '/images/Gemini_Generated_Image_e75x51e75x51e75x.png',
      alt: 'Neurology & Movement Disorder Clinic'
    },
    {
      url: '/images/Gemini_Generated_Image_zatx69zatx69zatx.png',
      alt: 'Therapies & Wellness Strategies'
    }
  ]

  // Auto-slide functionality - changes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section
      id="home"
      className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] leading-tight mb-6">
              Detect Parkinson's Early with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent font-extrabold" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Upload handwriting or voice samples and get quick predictions
              powered by deep learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('upload')}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Upload className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Try Prediction</span>
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border-2 border-primary hover:border-purple-500 hover:shadow-md hover:shadow-purple-200 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-purple-600" />
                Learn More
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 max-w-xl">
              <span className="text-red-600 font-medium">Important:</span> This is not a diagnostic tool. Please consult healthcare professionals for medical diagnosis.
            </p>
          </div>

          {/* Right Carousel */}
          <div className="relative fade-in">
            <div className="relative w-full h-80 md:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Image Carousel */}
              <div className="relative w-full h-full">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium z-10">
                {currentSlide + 1} / {carouselImages.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


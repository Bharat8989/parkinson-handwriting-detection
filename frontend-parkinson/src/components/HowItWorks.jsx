import React, { useEffect, useRef, useState } from 'react'
import { FileText, Mic, Brain } from 'lucide-react'

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const steps = [
    {
      icon: FileText,
      title: 'Upload handwriting image',
      description: 'Take a clear photo or scan of handwritten text (JPG/PNG format)',
      color: 'bg-blue-100 text-primary',
    },
    {
      icon: Mic,
      title: 'Upload voice sample',
      description: 'Record or upload a voice sample (WAV/MP3 format)',
      color: 'bg-green-100 text-accent',
    },
    {
      icon: Brain,
      title: "AI predicts Parkinson's likelihood",
      description: 'Our deep learning models analyze patterns and provide instant results',
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system makes early detection simple and accessible
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 border border-gray-100 h-full flex flex-col items-center text-center group hover:-translate-y-2 hover:border-purple-300/30">
                  <div
                    className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      index === 0 ? 'from-blue-400/30 to-purple-400/30' :
                      index === 1 ? 'from-green-400/30 to-teal-400/30' :
                      'from-purple-400/30 to-pink-400/30'
                    } opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    <Icon className="w-10 h-10 relative z-10" strokeWidth={2} />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gray-300">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


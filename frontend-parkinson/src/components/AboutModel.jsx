import React, { useEffect, useRef, useState } from 'react'
import { Network, Layers } from 'lucide-react'

const AboutModel = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            About the Model
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powered by advanced deep learning architectures
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our AI model combines two powerful deep learning architectures to
                accurately predict Parkinson's disease from multimodal data:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                      CNN (Convolutional Neural Network)
                    </h3>
                    <p className="text-gray-600">
                      Analyzes handwriting images to detect micrographia, tremor,
                      and other motor symptoms characteristic of Parkinson's disease.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                      LSTM (Long Short-Term Memory)
                    </h3>
                    <p className="text-gray-600">
                      Processes voice recordings to identify vocal changes,
                      including reduced volume, monotone speech, and articulation
                      issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-teal-500/5 rounded-xl p-6 border-l-4 border-primary shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Research-based:</strong> Our
                  models are trained on validated datasets and continuously
                  improved to ensure high accuracy and reliability in early
                  detection.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-purple-100/50 flex items-center justify-center">
              {/* Neural Network Visualization */}
              <div className="absolute inset-0 p-8">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* CNN Layers */}
                  <g opacity="0.8">
                    <rect
                      x="50"
                      y="50"
                      width="80"
                      height="300"
                      fill="#2563EB"
                      rx="10"
                      opacity="0.3"
                    />
                    <text
                      x="90"
                      y="215"
                      textAnchor="middle"
                      fill="#2563EB"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      CNN
                    </text>
                  </g>

                  {/* LSTM Layers */}
                  <g opacity="0.8">
                    <rect
                      x="270"
                      y="50"
                      width="80"
                      height="300"
                      fill="#2563EB"
                      rx="10"
                      opacity="0.3"
                    />
                    <text
                      x="310"
                      y="215"
                      textAnchor="middle"
                      fill="#2563EB"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      LSTM
                    </text>
                  </g>

                  {/* Connections */}
                  <line
                    x1="130"
                    y1="150"
                    x2="270"
                    y2="150"
                    stroke="#1E293B"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="130"
                    y1="200"
                    x2="270"
                    y2="200"
                    stroke="#1E293B"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="130"
                    y1="250"
                    x2="270"
                    y2="250"
                    stroke="#1E293B"
                    strokeWidth="2"
                    opacity="0.3"
                  />

                  {/* Center Brain Icon */}
                  <g transform="translate(200, 200)">
                    <circle
                      cx="0"
                      cy="0"
                      r="40"
                      fill="#2563EB"
                      opacity="0.2"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill="#2563EB"
                      opacity="0.4"
                    />
                  </g>

                  {/* Animated nodes */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * Math.PI * 2) / 8
                    const radius = 60
                    const x = 200 + radius * Math.cos(angle)
                    const y = 200 + radius * Math.sin(angle)
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#2563EB"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur={`${1.5 + i * 0.2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )
                  })}
                </svg>
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <p className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                  AI Model Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutModel


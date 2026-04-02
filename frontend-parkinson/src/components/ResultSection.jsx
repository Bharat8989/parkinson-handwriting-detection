import React from 'react'
import { CheckCircle, XCircle, Download, RotateCcw, AlertCircle, History } from 'lucide-react'

const ResultSection = ({ result, onReset, onViewHistory }) => {
  const isPositive = result.prediction === 'Positive'
  const isNegative = result.prediction === 'Negative'
  const hasError = result.error || result.prediction === 'Error'

  const downloadReport = () => {
    // Placeholder for PDF generation
    // TODO: Implement actual PDF generation with results
    const reportContent = `
      NeuroPredict - Parkinson Disease Prediction Report
      ===================================================
      
      Prediction: ${result.prediction}
      Confidence: ${result.confidence}%
      Date: ${new Date().toLocaleDateString()}
      
      Note: This is a demo report. In production, this would be a detailed PDF document.
    `
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neuropredict-report-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-2xl shadow-xl p-8 md:p-12 border-4 ${
            hasError
              ? 'border-yellow-400 bg-yellow-50'
              : isPositive
              ? 'border-red-500 bg-red-50'
              : 'border-green-500 bg-green-50'
          }`}
        >
          <div className="text-center mb-8">
            {hasError ? (
              <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            ) : isPositive ? (
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            ) : (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            )}
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
              {hasError ? 'Analysis Error' : 'Prediction Result'}
            </h2>

            {hasError ? (
              <p className="text-lg text-gray-700">{result.error}</p>
            ) : (
              <>
                <div className="mb-6">
                  <p
                    className={`text-2xl md:text-3xl font-bold mb-2 ${
                      isPositive ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {isPositive
                      ? 'Positive for Parkinson\'s'
                      : 'Negative for Parkinson\'s'}
                  </p>
                  <p className="text-lg text-gray-600">
                    Confidence Score: <span className="font-semibold">{result.confidence}%</span>
                  </p>
                </div>

                <div className="mb-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-left">
                    <span className="text-red-600 font-medium">Important:</span> This is not a diagnostic tool. This prediction is based on AI analysis and should not replace professional medical diagnosis. Please consult with healthcare professionals for accurate diagnosis and treatment decisions.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!hasError && (
              <button
                onClick={downloadReport}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Download Report (PDF)</span>
              </button>
            )}
            {onViewHistory && (
              <button
                onClick={onViewHistory}
                className="bg-accent hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <History className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View History</span>
              </button>
            )}
            <button
              onClick={onReset}
              className="bg-white hover:bg-gray-50 text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-primary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultSection


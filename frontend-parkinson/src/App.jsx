import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import UploadSection from './components/UploadSection'
import ResultSection from './components/ResultSection'
import AboutModel from './components/AboutModel'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Records from './components/Records'

function App() {
  const [predictionResult, setPredictionResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [showRecords, setShowRecords] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setIsAuthenticated(true)
      setUserEmail(userData.email)
    }
  }, [])

  const handleLogin = (email) => {
    setIsAuthenticated(true)
    setUserEmail(email)
    setShowRecords(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserEmail('')
    setShowRecords(false)
    setPredictionResult(null)
  }

  const handleAnalysis = async (handwritingFile, voiceFile) => {
    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      if (handwritingFile) formData.append('handwriting', handwritingFile)
  
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      })
  
      const data = await response.json()
      console.log("Response:", data)
  
      if (data.error) throw new Error(data.error)
  
      const result = {
        prediction: data.prediction === 'parkinson' ? 'Positive' : 'Negative',
        confidence: data.confidence,
        handwritingFile: handwritingFile ? handwritingFile.name : null,
        voiceFile: voiceFile ? voiceFile.name : null,
        date: new Date().toLocaleString(),
      }
  
      setPredictionResult(result)
  
      if (isAuthenticated && userEmail) {
        const savedRecords = localStorage.getItem(`records_${userEmail}`)
        const records = savedRecords ? JSON.parse(savedRecords) : []
        records.unshift(result)
        localStorage.setItem(`records_${userEmail}`, JSON.stringify(records))
      }
    } catch (error) {
      console.error('Error analyzing:', error)
      setPredictionResult({
        prediction: 'Error',
        confidence: 0,
        error: 'Failed to analyze. Please try again.'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }
  

  const handleReset = () => {
    setPredictionResult(null)
  }

  // Show Signup page
  if (showSignup && !isAuthenticated) {
    return (
      <Signup
        onSignup={handleLogin}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowRecords(true)
        }}
      />
    )
  }

  // Show Login page if not authenticated and trying to view records
  if (showRecords && !isAuthenticated) {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setShowRecords(false)
          setShowSignup(true)
        }}
      />
    )
  }

  // Show Records page if authenticated and viewing records
  if (showRecords && isAuthenticated) {
    return <Records userEmail={userEmail} onLogout={handleLogout} />
  }

  // Main website
  return (
    <div className="min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        userEmail={userEmail}
        onLoginClick={() => {
          if (isAuthenticated) {
            setShowRecords(true)
          } else {
            setShowSignup(false)
            setShowRecords(true)
          }
        }}
        onSignupClick={() => {
          setShowRecords(false)
          setShowSignup(true)
        }}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <HowItWorks />
        <UploadSection onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
        {predictionResult && (
          <ResultSection 
            result={predictionResult} 
            onReset={handleReset}
            onViewHistory={() => {
              if (isAuthenticated) {
                setShowRecords(true)
              } else {
                setShowRecords(true)
              }
            }}
          />
        )}
        <AboutModel />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App


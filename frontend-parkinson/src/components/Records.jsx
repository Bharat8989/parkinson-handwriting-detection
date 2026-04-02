import React, { useState, useEffect } from 'react'
import { LogOut, Download, Calendar, FileText, TrendingUp, TrendingDown, Search } from 'lucide-react'

const Records = ({ userEmail, onLogout }) => {
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date') // date, confidence

  useEffect(() => {
    // Load records from localStorage
    const savedRecords = localStorage.getItem(`records_${userEmail}`)
    if (savedRecords) {
      const parsed = JSON.parse(savedRecords)
      setRecords(parsed)
      setFilteredRecords(parsed)
    }
  }, [userEmail])

  useEffect(() => {
    // Filter and sort records
    let filtered = [...records]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.prediction.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date)
      } else if (sortBy === 'confidence') {
        return b.confidence - a.confidence
      }
      return 0
    })

    setFilteredRecords(filtered)
  }, [searchTerm, sortBy, records])

  const handleLogout = () => {
    localStorage.removeItem('user')
    onLogout()
  }

  const exportRecords = () => {
    const csv = [
      ['Date', 'Prediction', 'Confidence', 'Handwriting File', 'Voice File'].join(','),
      ...filteredRecords.map((r) =>
        [
          r.date,
          r.prediction,
          `${r.confidence}%`,
          r.handwritingFile || 'N/A',
          r.voiceFile || 'N/A',
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neuropredict-records-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPredictionColor = (prediction) => {
    if (prediction === 'Positive') return 'text-red-600 bg-red-50 border-red-200'
    if (prediction === 'Negative') return 'text-green-600 bg-green-50 border-green-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Prediction History</h1>
              <p className="text-gray-600">
                Welcome back, <span className="font-semibold text-primary">{userEmail}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportRecords}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-gray-50 text-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-primary flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Records</p>
                <p className="text-3xl font-bold text-[#1E293B]">{records.length}</p>
              </div>
              <FileText className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Positive Cases</p>
                <p className="text-3xl font-bold text-red-600">
                  {records.filter((r) => r.prediction === 'Positive').length}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-red-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Negative Cases</p>
                <p className="text-3xl font-bold text-green-600">
                  {records.filter((r) => r.prediction === 'Negative').length}
                </p>
              </div>
              <TrendingDown className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date or prediction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="confidence">Sort by Confidence</option>
            </select>
          </div>
        </div>

        {/* Records List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No records found</p>
              <p className="text-gray-400 text-sm">
                {records.length === 0
                  ? 'Start making predictions to see your history here'
                  : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRecords.map((record, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 font-medium">{record.date}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPredictionColor(
                            record.prediction
                          )}`}
                        >
                          {record.prediction}
                        </span>
                      </div>
                      <div className="ml-8 text-gray-600">
                        <p className="mb-1">
                          <span className="font-medium">Confidence:</span>{' '}
                          <span className="text-primary font-semibold">{record.confidence}%</span>
                        </p>
                        {record.handwritingFile && (
                          <p className="text-sm text-gray-500">
                            Handwriting: {record.handwritingFile}
                          </p>
                        )}
                        {record.voiceFile && (
                          <p className="text-sm text-gray-500">Voice: {record.voiceFile}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Records


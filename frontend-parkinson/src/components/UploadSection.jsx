
import React, { useState, useRef } from 'react'
import { Upload as UploadIcon, X, FileText } from 'lucide-react'

const UploadSection = ({ onAnalyze, isAnalyzing }) => {
  const [handwritingFile, setHandwritingFile] = useState(null)
  const [handwritingDragActive, setHandwritingDragActive] = useState(false)

  const handwritingInputRef = useRef(null)

  const handleHandwritingFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setHandwritingFile(file)
    } else {
      alert('Please upload a JPG or PNG image file')
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setHandwritingDragActive(true)
    } else if (e.type === 'dragleave') {
      setHandwritingDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHandwritingDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleHandwritingFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleHandwritingFile(e.target.files[0])
    }
  }

  const handleAnalyze = () => {
    if (!handwritingFile) {
      alert('Please upload handwriting image')
      return
    }

    console.log('Sending for analysis:', handwritingFile?.name)

    onAnalyze(handwritingFile)
  }

  const removeFile = () => {
    setHandwritingFile(null)
    if (handwritingInputRef.current) handwritingInputRef.current.value = ''
  }

  return (
    <section className="py-16 px-4 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
            Upload Handwriting Sample
          </h2>

          <p className="text-gray-600">
            Upload handwriting image for AI prediction
          </p>
        </div>

        {/* Upload Box */}
        <div
          className={`border-2 border-dashed rounded-2xl p-8 transition-all ${
            handwritingDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >

          <div className="text-center">

            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Handwriting Upload
            </h3>

            <p className="text-gray-500 mb-4">
              Supports .jpg .png
            </p>

            {handwritingFile ? (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-between items-center">
                <span className="text-sm truncate">
                  {handwritingFile.name}
                </span>

                <button onClick={removeFile}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-primary" />

                <p className="text-gray-500 text-sm mb-4">
                  Drag and drop or click to upload
                </p>
              </>
            )}

            <input
              ref={handwritingInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileInput}
              id="handwriting-input"
            />

            <label
              htmlFor="handwriting-input"
              className="inline-block w-full border-2 border-primary text-primary px-6 py-3 rounded-lg cursor-pointer"
            >
              {handwritingFile ? 'Change File' : 'Choose File'}
            </label>

          </div>
        </div>

        {/* Analyze Button */}

        <div className="text-center mt-10">
         <button
  onClick={handleAnalyze}
  disabled={isAnalyzing}
  className="bg-primary text-white px-10 py-3 rounded-lg font-semibold"
>
  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
</button>
        </div>

      </div>
    </section>
  )
}

export default UploadSection

// import React, { useState, useRef } from 'react'
// import { Upload as UploadIcon, X, FileText, Mic } from 'lucide-react'

// const UploadSection = ({ onAnalyze, isAnalyzing }) => {
//   const [handwritingFile, setHandwritingFile] = useState(null)
//   const [voiceFile, setVoiceFile] = useState(null)
//   const [handwritingDragActive, setHandwritingDragActive] = useState(false)
//   const [voiceDragActive, setVoiceDragActive] = useState(false)
  
//   const handwritingInputRef = useRef(null)
//   const voiceInputRef = useRef(null)

//   const handleHandwritingFile = (file) => {
//     if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
//       setHandwritingFile(file)
//     } else {
//       alert('Please upload a JPG or PNG image file')
//     }
//   }

//   const handleVoiceFile = (file) => {
//     if (file && (file.type === 'audio/wav' || file.type === 'audio/mpeg' || file.type === 'audio/mp3')) {
//       setVoiceFile(file)
//     } else {
//       alert('Please upload a WAV or MP3 audio file')
//     }
//   }

//   const handleDrag = (e, setDragActive) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true)
//     } else if (e.type === 'dragleave') {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e, type) => {
//     e.preventDefault()
//     e.stopPropagation()
    
//     if (type === 'handwriting') {
//       setHandwritingDragActive(false)
//       if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//         handleHandwritingFile(e.dataTransfer.files[0])
//       }
//     } else {
//       setVoiceDragActive(false)
//       if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//         handleVoiceFile(e.dataTransfer.files[0])
//       }
//     }
//   }

//   const handleFileInput = (e, type) => {
//     if (type === 'handwriting' && e.target.files && e.target.files[0]) {
//       handleHandwritingFile(e.target.files[0])
//     } else if (type === 'voice' && e.target.files && e.target.files[0]) {
//       handleVoiceFile(e.target.files[0])
//     }
//   }

//   const handleAnalyze = () => {
//     if (!handwritingFile && !voiceFile) {
//       alert('Please upload at least one file (handwriting or voice)')
//       return
//     }

//     // ✅ Make sure the file is passed correctly to backend
//     console.log('Sending for analysis:', {
//       handwriting: handwritingFile?.name,
//       voice: voiceFile?.name
//     })

//     onAnalyze(handwritingFile, voiceFile)
//   }

//   const removeFile = (type) => {
//     if (type === 'handwriting') {
//       setHandwritingFile(null)
//       if (handwritingInputRef.current) handwritingInputRef.current.value = ''
//     } else {
//       setVoiceFile(null)
//       if (voiceInputRef.current) voiceInputRef.current.value = ''
//     }
//   }

//   return (
//     <section id="upload" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12 md:mb-16">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
//             Upload Your Samples
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
//             Upload handwriting and/or voice samples for accurate AI prediction
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           {/* Handwriting Upload Box */}
//           <div
//             className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
//               handwritingDragActive
//                 ? 'border-primary bg-primary/5'
//                 : 'border-gray-300 hover:border-primary/50 bg-white'
//             }`}
//             onDragEnter={(e) => handleDrag(e, setHandwritingDragActive)}
//             onDragLeave={(e) => handleDrag(e, setHandwritingDragActive)}
//             onDragOver={(e) => handleDrag(e, setHandwritingDragActive)}
//             onDrop={(e) => handleDrop(e, 'handwriting')}
//           >
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <FileText className="w-8 h-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
//                 Handwriting Upload
//               </h3>
//               <p className="text-gray-500 mb-4">Supports .jpg, .png</p>

//               {handwritingFile ? (
//                 <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <FileText className="w-5 h-5 text-primary flex-shrink-0" />
//                     <span className="text-sm text-gray-700 truncate">
//                       {handwritingFile.name}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => removeFile('handwriting')}
//                     className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
//                   >
//                     <X className="w-4 h-4 text-gray-600" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mb-6">
//                   <UploadIcon className="w-12 h-12 text-primary mx-auto mb-4" />
//                   <p className="text-gray-500 text-sm mb-4">
//                     Drag and drop or click to browse
//                   </p>
//                 </div>
//               )}

//               <input
//                 ref={handwritingInputRef}
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 className="hidden"
//                 onChange={(e) => handleFileInput(e, 'handwriting')}
//                 id="handwriting-input"
//               />
//               <label
//                 htmlFor="handwriting-input"
//                 className="inline-block w-full bg-white hover:bg-gray-50 text-primary px-6 py-3 rounded-lg font-medium transition-all cursor-pointer border-2 border-primary text-center"
//               >
//                 {handwritingFile ? 'Change File' : 'Choose File'}
//               </label>
//             </div>
//           </div>

//           {/* Voice Upload Box */}
//           <div
//             className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
//               voiceDragActive
//                 ? 'border-accent bg-accent/5'
//                 : 'border-gray-300 hover:border-accent/50 bg-white'
//             }`}
//             onDragEnter={(e) => handleDrag(e, setVoiceDragActive)}
//             onDragLeave={(e) => handleDrag(e, setVoiceDragActive)}
//             onDragOver={(e) => handleDrag(e, setVoiceDragActive)}
//             onDrop={(e) => handleDrop(e, 'voice')}
//           >
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Mic className="w-8 h-8 text-accent" />
//               </div>
//               <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
//                 Voice Upload
//               </h3>
//               <p className="text-gray-500 mb-4">Supports .wav, .mp3</p>

//               {voiceFile ? (
//                 <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <Mic className="w-5 h-5 text-accent flex-shrink-0" />
//                     <span className="text-sm text-gray-700 truncate">
//                       {voiceFile.name}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => removeFile('voice')}
//                     className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
//                   >
//                     <X className="w-4 h-4 text-gray-600" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mb-6">
//                   <UploadIcon className="w-12 h-12 text-accent mx-auto mb-4" />
//                   <p className="text-gray-500 text-sm mb-4">
//                     Drag and drop or click to browse
//                   </p>
//                 </div>
//               )}

//               <input
//                 ref={voiceInputRef}
//                 type="file"
//                 accept=".wav,.mp3,.mpeg"
//                 className="hidden"
//                 onChange={(e) => handleFileInput(e, 'voice')}
//                 id="voice-input"
//               />
//               <label
//                 htmlFor="voice-input"
//                 className="inline-block w-full bg-white hover:bg-gray-50 text-accent px-6 py-3 rounded-lg font-medium transition-all cursor-pointer border-2 border-accent text-center"
//               >
//                 {voiceFile ? 'Change File' : 'Choose File'}
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Analyze Button */}
//         <div className="text-center">
//           <button
//             onClick={handleAnalyze}
//             disabled={isAnalyzing || (!handwritingFile && !voiceFile)}
//             className="bg-primary hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/40 transform hover:-translate-y-1 disabled:transform-none flex items-center gap-3 mx-auto relative overflow-hidden group"
//           >
//             <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//             {isAnalyzing ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Analyzing...
//               </>
//             ) : (
//               <span className="relative z-10">Analyze Now</span>
//             )}
//           </button>
//         </div>

//         <div className="mt-8 text-left">
//           <p className="text-xs text-gray-500">
//             <span className="text-red-600 font-medium">Important:</span> This is not a diagnostic tool. Please consult healthcare professionals for medical diagnosis.
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default UploadSection

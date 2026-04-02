# NeuroPredict - Parkinson Disease Prediction using AI

A modern, responsive single-page web application for detecting Parkinson's disease likelihood using AI-powered analysis of handwriting and voice samples. Built with React, Tailwind CSS, and Vite.

## 🚀 Features

- **Modern UI/UX**: Clean, medical-tech themed design with smooth animations
- **Dual Input System**: Upload both handwriting images and voice recordings
- **AI-Powered Analysis**: Powered by CNN (for handwriting) and LSTM (for voice patterns)
- **Real-time Results**: Get instant predictions with confidence scores
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Drag & drop file upload, loading animations, hover effects

## 📁 Project Structure

```
parkinson/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation bar
│   │   ├── Hero.jsx             # Hero section with CTA buttons
│   │   ├── HowItWorks.jsx       # 3-step process explanation
│   │   ├── UploadSection.jsx   # File upload with drag & drop
│   │   ├── ResultSection.jsx   # Prediction results display
│   │   ├── AboutModel.jsx      # Model architecture explanation
│   │   ├── Contact.jsx          # Contact form with social links
│   │   └── Footer.jsx           # Footer with links
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css               # Tailwind CSS imports
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd parkinson
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. To preview the production build:

```bash
npm run preview
```

## 🔌 Backend API Integration

The application includes placeholder code for backend API integration. To connect to your backend:

1. **Update the API endpoint in `src/App.jsx`:**
   ```javascript
   // Replace the mock API call with:
   const response = await fetch('YOUR_API_URL/api/predict', {
     method: 'POST',
     body: formData
   })
   const data = await response.json()
   ```

2. **Update the contact form endpoint in `src/components/Contact.jsx`:**
   ```javascript
   const response = await fetch('YOUR_API_URL/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   })
   ```

## 🎨 Design Specifications

- **Primary Color**: `#2563EB` (Blue)
- **Accent Color**: `#10B981` (Green)
- **Background**: `#F9FAFB` (Off-white)
- **Text Color**: `#1E293B` (Slate)
- **Font**: Inter & Poppins (via Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ✨ Key Features Implementation

### File Upload
- Drag & drop support for both handwriting and voice files
- File type validation (JPG/PNG for images, WAV/MP3 for audio)
- File preview with ability to remove/change files

### Results Display
- Color-coded results (Green for negative, Red for positive)
- Confidence score display
- Download report functionality (placeholder for PDF generation)
- Try again option to reset and upload new files

### Animations
- Fade-in animations on scroll
- Hover effects on buttons and cards
- Smooth scroll navigation
- Loading spinners during analysis

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: '#YOUR_PRIMARY_COLOR',
  accent: '#YOUR_ACCENT_COLOR',
}
```

### Adding Sections
1. Create a new component in `src/components/`
2. Import and add it to `src/App.jsx`
3. Update navigation links if needed

## 📝 Notes

- The current implementation uses mock data for predictions
- PDF report generation is a placeholder (currently downloads a text file)
- Backend API endpoints need to be implemented separately
- Ensure your backend handles CORS if running on a different domain

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### Other Platforms
Build the project and deploy the `dist` folder to your hosting platform.

## 📄 License

This project is part of the NeuroPredict initiative for Parkinson's disease early detection.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, use the contact form on the website or reach out through the social media links.

---

Built with ❤️ using React, Tailwind CSS, and Vite

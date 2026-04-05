# Parkinson's Disease Detection using Deep Learning

This project focuses on **early detection of Parkinson’s Disease** using **Deep Learning techniques** applied to handwriting spiral images.

Parkinson’s disease is a **progressive neurological disorder** that affects movement and motor control. One of the earliest symptoms is **tremor in handwriting**. By analyzing spiral drawings, machine learning models can detect patterns associated with Parkinson’s disease.

This system uses a **Convolutional Neural Network (CNN)** to classify spiral drawings as:

- Healthy
- Parkinson's Disease

---

# Problem Statement

Traditional diagnosis of Parkinson’s disease requires:

- Clinical observation
- Medical tests
- Neurological examination

Handwriting analysis provides a **simple and non-invasive method** to detect early symptoms of Parkinson’s disease.

The goal of this project is to build a **Deep Learning model** that analyzes spiral handwriting images and predicts whether the person may have Parkinson’s disease.

---

# Approach

The system follows these steps:

1. Collect spiral handwriting images
2. Preprocess images using OpenCV
3. Normalize and resize images
4. Train CNN model using TensorFlow/Keras
5. Predict whether handwriting belongs to:

- Healthy person
- Parkinson’s patient

---

# Model Used

The model used in this project is a **Convolutional Neural Network (CNN)**.

The CNN learns important handwriting features such as:

- Tremor in handwriting
- Irregular line patterns
- Distorted spiral shapes
- Uneven pressure in strokes

Libraries used:

- TensorFlow / Keras
- OpenCV
- NumPy
- Scikit-learn
- Matplotlib

---

# Dataset

The dataset contains **spiral handwriting images** belonging to two categories:

- Healthy individuals
- Parkinson’s disease patients

Dataset structure:

data/
├── spiral/
│   ├── train/
│   └── test/
│
└── wave/
    ├── train/
    └── test/

These images are used to train the CNN model to detect Parkinson’s disease patterns.

---

# Project Structure

parkinson-handwriting-detection/
│
├── backend-parkinson/
│   │
│   ├── data/
│   │   ├── spiral/
│   │   │   ├── train/
│   │   │   └── test/
│   │   │
│   │   └── wave/
│   │       ├── train/
│   │       └── test/
│   │
│   ├── testing_imgs/
│   │
│   ├── app.py
│   ├── predict_single.py
│   ├── train_cnn_spiral.py
│   │
│   ├── cnn_combined_model_best.h5
│   ├── cnn_combined_model_final.h5
│   │
│   ├── confusion_matrix_combined.png
│   ├── training_curves_combined.png
│   │
│   └── requirements.txt
│
├── frontend-parkinson/
│   │
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│
└── README.md


---

# Technologies Used

| Technology | Purpose |
|------------|--------|
Python | Backend development |
TensorFlow/Keras | Deep Learning Model |
OpenCV | Image Processing |
NumPy | Numerical Computation |
Scikit-learn | Model Evaluation |
Flask | Backend API |
React / Vite | Frontend Development |
Tailwind CSS | UI Styling |

---

## Installation & Run Project

```bash
# Clone the repository
git https://github.com/Bharat8989/parkinson-handwriting-detection.git
# Go to project folder
cd parkinson-handwriting-detection

# Move to backend
cd backend-parkinson

# Install required Python libraries
pip install -r requirements.txt

# Train the CNN model
python train_cnn_spiral.py

# Run the Flask backend server
python app.py
```
<!-- py -3.10 app.py      -->

Backend will run at:

http://127.0.0.1:5000

---

## Frontend Setup

```bash
# Move to frontend folder
cd frontend-parkinson

# Install node modules
npm install

# Start the development server
npm run dev
```

Frontend will run at:

http://localhost:5173

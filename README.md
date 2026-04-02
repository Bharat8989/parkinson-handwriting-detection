# Parkinson’s Disease Prediction using Deep Learning

This project focuses on early prediction of Parkinson’s disease using deep learning techniques applied to handwriting spiral images.

Parkinson’s disease is a progressive neurological disorder that affects movement and motor control. One of the early symptoms of Parkinson’s disease is tremor in handwriting. By analyzing spiral drawings, machine learning models can detect patterns associated with the disease.

This system uses a Convolutional Neural Network (CNN) to classify spiral drawings as **Healthy** or **Parkinson**.

---

## Problem Statement

Traditional diagnosis of Parkinson’s disease requires clinical observation and medical tests. Handwriting analysis provides a simple and non-invasive method to detect early symptoms of the disease.

This project aims to build a deep learning model that can analyze spiral handwriting images and predict whether the person may have Parkinson’s disease.

---

## Approach

The system uses deep learning to analyze spiral handwriting images.

* Spiral drawings are collected as input images.
* Images are preprocessed and normalized.
* A Convolutional Neural Network (CNN) is trained to classify the images.
* The model predicts whether the handwriting pattern corresponds to a **healthy individual** or a **Parkinson’s patient**.

---

## Model Used

* Convolutional Neural Network (CNN)
* Image preprocessing using OpenCV
* Model training using TensorFlow / Keras

The CNN model learns features such as:

* Tremor in handwriting
* Irregular line patterns
* Distortion in spiral shapes

---

## Dataset

The dataset contains spiral handwriting images of two categories:

* Healthy individuals
* Parkinson’s disease patients

These images are used to train the CNN model to recognize patterns related to Parkinson’s disease.

---

## Technologies Used

* Python
* TensorFlow / Keras
* OpenCV
* NumPy
* Pandas
* Scikit-learn

---

## Install Required Libraries
cd backend-parkinson


pip install tensorflow
pip install opencv-python
pip install numpy
pip install pandas
pip install scikit-learn
pip install matplotlib
pip install flask

---

## Train the CNN Model

Run the training script:

python train_cnn_spiral.py

---

## Run the Backend Server

Start the Flask backend:

python app.py

---

## Run the Frontend

Move to the frontend folder:

cd frontend-parkinson

Install Node modules:

npm install

Start the frontend:

npm run dev

---
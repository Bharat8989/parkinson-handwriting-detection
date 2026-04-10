from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
import tempfile

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load trained model
# -----------------------------
MODEL_PATH = "cnn_combined_model_final.h5"

model = tf.keras.models.load_model(MODEL_PATH)

class_names = ["healthy", "parkinson"]


# -----------------------------
# Home Route (important for test)
# -----------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "Parkinson Detection API Running"
    })


# -----------------------------
# Prediction API
# -----------------------------
@app.route("/api/predict", methods=["POST"])
def predict():

    if "handwriting" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["handwriting"]

    try:
        # create temp file
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            file.save(temp.name)
            file_path = temp.name

        # Load image
        img = image.load_img(
            file_path,
            target_size=(128, 128),
            color_mode="grayscale"
        )

        img_array = image.img_to_array(img)

        img_array = np.expand_dims(img_array, axis=0)

        img_array = img_array / 255.0

        # Predict
        prediction = model.predict(img_array)

        prob_parkinson = float(prediction[0][0])
        prob_healthy = 1 - prob_parkinson

        predicted_class = "parkinson" if prob_parkinson > 0.5 else "healthy"

        confidence = round(max(prob_parkinson, prob_healthy) * 100, 2)

        return jsonify({
            "prediction": predicted_class,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
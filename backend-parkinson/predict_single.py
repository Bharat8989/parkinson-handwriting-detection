import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load trained model
model = tf.keras.models.load_model("cnn_combined_model_final.h5")
# Path of test image
img_path = "testing_imgs/test1.png"

# Load image
img = image.load_img(img_path, target_size=(128,128), color_mode="grayscale")

# Convert image to array
img_array = image.img_to_array(img)

# Add batch dimension
img_array = np.expand_dims(img_array, axis=0)

# Normalize image
img_array = img_array / 255.0

# Predict
# Predict
pred = model.predict(img_array, verbose=0)

prob_parkinson = float(pred[0][0])
prob_healthy = 1 - prob_parkinson

predicted_class = "parkinson" if prob_parkinson > 0.5 else "healthy"
confidence = round(max(prob_parkinson, prob_healthy) * 100, 2)

print("✅ Predicted:", predicted_class)
print(f"🧾 Probabilities → Healthy: {prob_healthy:.4f}, Parkinson: {prob_parkinson:.4f}")
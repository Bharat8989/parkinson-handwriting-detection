import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

# -----------------------------
# CONFIG
# -----------------------------
IMG_SIZE = 128
BATCH_SIZE = 8
EPOCHS = 50

spiral_train_dir = "data/spiral/train"
spiral_test_dir = "data/spiral/test"
wave_train_dir = "data/wave/train"
wave_test_dir = "data/wave/test"

# -----------------------------
# LOAD ALL IMAGES INTO ARRAYS (Better approach for small datasets)
# -----------------------------
def load_images_from_directory(directory, img_size):
    """Load all images from directory into numpy arrays"""
    images = []
    labels = []
    class_names = sorted(os.listdir(directory))
    class_to_idx = {name: idx for idx, name in enumerate(class_names)}
    
    for class_name in class_names:
        class_dir = os.path.join(directory, class_name)
        if not os.path.isdir(class_dir):
            continue
        for img_name in os.listdir(class_dir):
            img_path = os.path.join(class_dir, img_name)
            try:
                img = tf.keras.preprocessing.image.load_img(
                    img_path, 
                    target_size=(img_size, img_size),
                    color_mode='grayscale'
                )
                img_array = tf.keras.preprocessing.image.img_to_array(img)
                images.append(img_array)
                labels.append(class_to_idx[class_name])
            except Exception as e:
                print(f"Error loading {img_path}: {e}")
    
    return np.array(images), np.array(labels), class_to_idx

# Load spiral data
print("Loading Spiral data...")
spiral_train_x, spiral_train_y, class_indices = load_images_from_directory(spiral_train_dir, IMG_SIZE)
spiral_test_x, spiral_test_y, _ = load_images_from_directory(spiral_test_dir, IMG_SIZE)

# Load wave data
print("Loading Wave data...")
wave_train_x, wave_train_y, _ = load_images_from_directory(wave_train_dir, IMG_SIZE)
wave_test_x, wave_test_y, _ = load_images_from_directory(wave_test_dir, IMG_SIZE)

# Combine datasets
X_train = np.concatenate([spiral_train_x, wave_train_x], axis=0)
y_train = np.concatenate([spiral_train_y, wave_train_y], axis=0)
X_test = np.concatenate([spiral_test_x, wave_test_x], axis=0)
y_test = np.concatenate([spiral_test_y, wave_test_y], axis=0)

# Normalize
X_train = X_train.astype("float32") / 255.0
X_test = X_test.astype("float32") / 255.0

# Shuffle training data
shuffle_idx = np.random.permutation(len(X_train))
X_train = X_train[shuffle_idx]
y_train = y_train[shuffle_idx]

print(f"\nClass indices: {class_indices}")
print(f"Training samples: {len(X_train)} (Spiral: {len(spiral_train_x)}, Wave: {len(wave_train_x)})")
print(f"Testing samples: {len(X_test)} (Spiral: {len(spiral_test_x)}, Wave: {len(wave_test_x)})")

# -----------------------------
# DATA AUGMENTATION
# -----------------------------
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1,
    horizontal_flip=False,
)
datagen.fit(X_train)

# -----------------------------
# CLASS WEIGHTS
# -----------------------------
class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
class_weight_dict = dict(enumerate(class_weights))
print(f"Class weights: {class_weight_dict}")

# -----------------------------
# CNN MODEL
# -----------------------------
model = models.Sequential([
    layers.Input(shape=(IMG_SIZE, IMG_SIZE, 1)),

    layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(2, 2),

    layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(2, 2),

    layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(2, 2),

    layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D(2, 2),

    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.4),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.summary()

# -----------------------------
# CALLBACKS
# -----------------------------
checkpoint = ModelCheckpoint(
    "cnn_combined_model_best.h5", 
    monitor='val_accuracy', 
    save_best_only=True,
    verbose=1
)
earlystop = EarlyStopping(
    monitor='val_loss', 
    patience=10, 
    restore_best_weights=True,
    verbose=1
)

# -----------------------------
# TRAINING
# -----------------------------
history = model.fit(
    datagen.flow(X_train, y_train, batch_size=BATCH_SIZE),
    steps_per_epoch=len(X_train) // BATCH_SIZE,
    validation_data=(X_test, y_test),
    epochs=EPOCHS,
    callbacks=[checkpoint, earlystop],
    class_weight=class_weight_dict
)

# -----------------------------
# EVALUATION
# -----------------------------
print("\nEvaluating on combined test set:")
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_acc * 100:.2f}%")

# Separate evaluations
print("\nEvaluating on Spiral test set:")
spiral_loss, spiral_acc = model.evaluate(spiral_test_x / 255.0, spiral_test_y)
print(f"Spiral Accuracy: {spiral_acc * 100:.2f}%")

print("\nEvaluating on Wave test set:")
wave_loss, wave_acc = model.evaluate(wave_test_x / 255.0, wave_test_y)
print(f"Wave Accuracy: {wave_acc * 100:.2f}%")

# Save final model
model.save("cnn_combined_model_final.h5")
print("\nModel saved as cnn_combined_model_final.h5")

# -----------------------------
# TRAINING CURVES
# -----------------------------
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Val Accuracy')
plt.title('Training & Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Val Loss')
plt.title('Training & Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)

plt.tight_layout()
plt.savefig("training_curves_combined.png", dpi=300)
plt.show()

# -----------------------------
# CONFUSION MATRIX
# -----------------------------
y_pred = model.predict(X_test)
y_pred_classes = (y_pred > 0.5).astype(int).flatten()

labels = list(class_indices.keys())

cm = confusion_matrix(y_test, y_pred_classes)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
plt.title('Confusion Matrix (Combined Spiral + Wave)')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.savefig("confusion_matrix_combined.png", dpi=300)
plt.show()

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred_classes, target_names=labels))
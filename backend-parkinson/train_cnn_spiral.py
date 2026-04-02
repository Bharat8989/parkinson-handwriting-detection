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
BATCH_SIZE = 4
EPOCHS = 50

train_dir = "data/spiral/train"
test_dir = "data/spiral/test"

# -----------------------------
# DATASET GENERATORS
# -----------------------------
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=5,
    width_shift_range=0.05,
    height_shift_range=0.05,
    zoom_range=0.05,
    horizontal_flip=False,
)

test_datagen = ImageDataGenerator(rescale=1./255)

train_gen = train_datagen.flow_from_directory(
    train_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    color_mode='grayscale',
    batch_size=BATCH_SIZE,
    class_mode='binary',
    shuffle=True
)

test_gen = test_datagen.flow_from_directory(
    test_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    color_mode='grayscale',
    batch_size=BATCH_SIZE,
    class_mode='binary',
    shuffle=False
)

print("Class indices:", train_gen.class_indices)

# -----------------------------
# CLASS WEIGHTS (handle imbalance)
# -----------------------------
classes = list(train_gen.classes)
class_weights = compute_class_weight('balanced', classes=np.unique(classes), y=classes)
class_weight_dict = dict(enumerate(class_weights))
print("Class weights:", class_weight_dict)

# -----------------------------
# LIGHTWEIGHT CNN
# -----------------------------
model = models.Sequential([
    layers.Input(shape=(IMG_SIZE, IMG_SIZE, 1)),

    layers.Conv2D(16, (3,3), activation='relu', padding='same'),
    layers.MaxPooling2D(2,2),

    layers.Conv2D(32, (3,3), activation='relu', padding='same'),
    layers.MaxPooling2D(2,2),

    layers.Conv2D(64, (3,3), activation='relu', padding='same'),
    layers.MaxPooling2D(2,2),

    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=3e-4),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# -----------------------------
# TRAINING
# -----------------------------
checkpoint = ModelCheckpoint("cnn_spiral_model_best.h5", monitor='val_accuracy', save_best_only=True)
earlystop = EarlyStopping(monitor='val_loss', patience=8, restore_best_weights=True)

history = model.fit(
    train_gen,
    validation_data=test_gen,
    epochs=EPOCHS,
    callbacks=[checkpoint, earlystop],
    class_weight=class_weight_dict
)

# -----------------------------
# EVALUATION
# -----------------------------
val_loss, val_acc = model.evaluate(test_gen)
print(f"\n✅ Validation Accuracy: {val_acc*100:.2f}%")

model.save("cnn_spiral_model_final.h5")
print("✅ Model saved as cnn_spiral_model_final.h5")

# -----------------------------
# VISUALIZATIONS
# -----------------------------
# 1️⃣ Accuracy & Loss curves
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy', marker='o')
plt.plot(history.history['val_accuracy'], label='Val Accuracy', marker='o')
plt.title('Training & Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss', marker='o')
plt.plot(history.history['val_loss'], label='Val Loss', marker='o')
plt.title('Training & Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)

plt.tight_layout()
plt.savefig("training_curves.png", dpi=300)
plt.show()

# -----------------------------
# 2️⃣ Confusion Matrix
# -----------------------------
test_gen.reset()
y_pred = model.predict(test_gen)
y_pred_classes = (y_pred > 0.5).astype(int).flatten()
y_true = test_gen.classes
labels = list(test_gen.class_indices.keys())

cm = confusion_matrix(y_true, y_pred_classes)
plt.figure(figsize=(5, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.savefig("confusion_matrix.png", dpi=300)
plt.show()

# -----------------------------
# 3️⃣ Classification Report
# -----------------------------
print("\n📋 Classification Report:\n")
print(classification_report(y_true, y_pred_classes, target_names=labels))

# -----------------------------
# 4️⃣ Sample Predictions Grid
# -----------------------------
plt.figure(figsize=(10, 8))
for i in range(9):
    img, label = test_gen[i % len(test_gen)][0][0], test_gen[i % len(test_gen)][1][0]
    pred = model.predict(np.expand_dims(img, axis=0))[0][0]
    pred_label = labels[int(pred > 0.5)]
    true_label = labels[int(label)]
    plt.subplot(3, 3, i + 1)
    plt.imshow(img.squeeze(), cmap='gray')
    plt.title(f"T:{true_label}\nP:{pred_label} ({pred*100:.1f}%)", fontsize=10)
    plt.axis('off')

plt.tight_layout()
plt.savefig("sample_predictions.png", dpi=300)
plt.show()

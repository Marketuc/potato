from pathlib import Path
import os

# Optional: reduce TensorFlow warning/noise
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "model" / "model_name3.keras"

CLASS_NAMES = ["Healthy", "Early Blight", "Late Blight"]

print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH, compile=False)

input_shape = model.input_shape
if isinstance(input_shape, list):
    input_shape = input_shape[0]

IMAGE_HEIGHT = input_shape[1] or 240
IMAGE_WIDTH = input_shape[2] or 240

print(f"Loaded model from: {MODEL_PATH}")
print(f"Model input size: {IMAGE_WIDTH}x{IMAGE_HEIGHT}")


def prepare_image(file):
    image = Image.open(file).convert("RGB")
    image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))

    array = np.array(image).astype("float32") / 255.0
    array = np.expand_dims(array, axis=0)

    return array


# Warm up the model once so the first real prediction does not freeze
try:
    dummy = np.zeros((1, IMAGE_HEIGHT, IMAGE_WIDTH, 3), dtype=np.float32)
    _ = model(dummy, training=False)
    print("Model warm-up complete.")
except Exception as error:
    print("Model warm-up failed:", error)


@app.get("/")
def home():
    return jsonify({
        "message": "Potato Leaf Classifier API is running",
        "classes": CLASS_NAMES,
        "image_size": [IMAGE_WIDTH, IMAGE_HEIGHT]
    })


@app.post("/predict")
def predict():
    print("Prediction request received.")

    if "image" not in request.files:
        print("No image found in request.")
        return jsonify({"error": "No image file uploaded."}), 400

    file = request.files["image"]

    if file.filename == "":
        print("Empty filename.")
        return jsonify({"error": "No selected file."}), 400

    try:
        print(f"Image received: {file.filename}")

        image_array = prepare_image(file)
        print("Image prepared:", image_array.shape)

        output = model(image_array, training=False)
        scores = output.numpy()[0]
        scores = np.array(scores, dtype=float).reshape(-1)

        print("Raw model output:", scores)

        if len(scores) != len(CLASS_NAMES):
            return jsonify({
                "error": "Model output does not match class names.",
                "model_output_length": int(len(scores)),
                "class_names_length": int(len(CLASS_NAMES)),
                "raw_output": scores.tolist()
            }), 500

        # Apply softmax only if output is not already probability-like
        if np.min(scores) < 0 or np.max(scores) > 1 or abs(np.sum(scores) - 1) > 0.05:
            scores = tf.nn.softmax(scores).numpy()

        predicted_index = int(np.argmax(scores))
        predicted_class = CLASS_NAMES[predicted_index]
        confidence = float(scores[predicted_index] * 100)

        probabilities = {
            CLASS_NAMES[i]: round(float(scores[i] * 100), 2)
            for i in range(len(CLASS_NAMES))
        }

        result = {
            "class_name": predicted_class,
            "confidence": round(confidence, 2),
            "probabilities": probabilities
        }

        print("Prediction result:", result)

        return jsonify(result)

    except Exception as error:
        print("Prediction error:", error)
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5050,
        debug=False,
        use_reloader=False
    )
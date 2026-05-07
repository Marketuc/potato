from pathlib import Path
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
from io import BytesIO

app = FastAPI(title="Potato Leaf Classifier API")

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "model" / "model_name3.keras"

# Change this order if your training class order is different.
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


def prepare_image(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))

    array = np.array(image).astype("float32") / 255.0
    array = np.expand_dims(array, axis=0)

    return array


try:
    dummy = np.zeros((1, IMAGE_HEIGHT, IMAGE_WIDTH, 3), dtype=np.float32)
    _ = model(dummy, training=False)
    print("Model warm-up complete.")
except Exception as error:
    print("Model warm-up failed:", error)


@app.get("/")
def home():
    return {
        "message": "Potato Leaf Classifier API is running",
        "classes": CLASS_NAMES,
        "image_size": [IMAGE_WIDTH, IMAGE_HEIGHT]
    }


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    print("Prediction request received.")

    if not image.filename:
        return JSONResponse(
            status_code=400,
            content={"error": "No selected file."}
        )

    try:
        print(f"Image received: {image.filename}")

        image_bytes = await image.read()
        image_array = prepare_image(image_bytes)

        print("Image prepared:", image_array.shape)

        output = model(image_array, training=False)
        scores = output.numpy()[0]
        scores = np.array(scores, dtype=float).reshape(-1)

        print("Raw model output:", scores)

        if len(scores) != len(CLASS_NAMES):
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Model output does not match class names.",
                    "model_output_length": int(len(scores)),
                    "class_names_length": int(len(CLASS_NAMES)),
                    "raw_output": scores.tolist()
                }
            )

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

        return result

    except Exception as error:
        print("Prediction error:", error)
        return JSONResponse(
            status_code=500,
            content={"error": str(error)}
        )
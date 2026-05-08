# Potato Leaf Disease Detection System

A web-based machine learning project that classifies potato leaf images into three categories: **Healthy**, **Early Blight**, and **Late Blight**.

The project includes a modern React landing page and a prediction page connected to a FastAPI backend. The backend loads a trained Keras model and returns the predicted potato leaf condition with confidence scores.

---

## Project Overview

The **Potato Leaf Disease Detection System** is designed to help identify common potato leaf conditions using image classification.

Users can upload a potato leaf image, and the system will classify it as:

- Healthy
- Early Blight
- Late Blight

This project aims to support faster and easier detection of potato plant diseases through a simple web interface.

---

## Purpose of the Website

The purpose of this website is to provide a user-friendly platform where users can upload potato leaf images and receive a machine learning prediction.

It helps solve the problem of manually identifying potato leaf diseases, which can be difficult and time-consuming, especially when symptoms look similar.

---

## Features

- Modern landing page design
- Potato leaf disease classifier page
- Image upload functionality
- Image preview before classification
- Machine learning prediction result
- Confidence score display
- Probability scores for each class
- FastAPI backend integration
- TensorFlow/Keras model loading

---

## Technologies Used

### Frontend

**React JS**  
Used to build the user interface of the website.

**JavaScript**  
Used for handling image uploads, API requests, and frontend logic.

**CSS**  
Used to design the modern layout, responsive sections, cards, buttons, and prediction page.

**Vite**  
Used as the frontend development tool for running the React project.

### Backend

**FastAPI**  
Used to create the Python backend API that receives uploaded images and sends predictions back to the frontend.

**Python**  
Used for backend logic, image processing, and running the machine learning model.

### Machine Learning

**TensorFlow / Keras**  
Used to load and run the trained machine learning model.

**Pillow**  
Used to open, convert, and resize uploaded images.

**NumPy**  
Used to convert image data into arrays that the model can process.

---

## Website Structure

### Home Page

The home page introduces the project as a potato leaf classifier. It includes:

- Project name
- Short tagline
- Explore Project button
- About section
- How It Works section
- Features section
- Visual preview
- Developer section
- Footer

### About Section

Explains that the project uses a machine learning model to classify potato leaf images into Healthy, Early Blight, or Late Blight.

### How It Works Section

Shows the basic process:

```txt
Input Image → Processing → Prediction
import { useState } from 'react';

const API_URL = '/api/predict';

export default function ClassifierPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleImageChange(event) {
    const file = event.target.files[0];

    setResult(null);
    setError('');

    if (!file) {
      setSelectedImage(null);
      setPreview('');
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedImage) {
      setError('Please upload a potato leaf image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setLoading(true);
      setError('');
      setResult(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="classifier-page">
      <header className="classifier-header">
        <a href="/" className="back-link">← Back to Landing Page</a>
        <div>
          <p className="classifier-kicker">Machine Learning Classifier</p>
          <h1>Potato Leaf Disease Detection</h1>
          <p>
            Upload a potato leaf image and the CNN model will classify it as Healthy,
            Early Blight, or Late Blight.
          </p>
        </div>
      </header>

      <section className="classifier-layout">
        <form className="upload-card" onSubmit={handleSubmit}>
          <div className="upload-icon">🍃</div>
          <h2>Upload Leaf Image</h2>
          <p>Choose a clear potato leaf photo in JPG or PNG format.</p>

          <label className="file-input-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <span>{selectedImage ? selectedImage.name : 'Click to choose image'}</span>
          </label>

          <button className="classify-button" type="submit" disabled={loading}>
            {loading ? 'Classifying...' : 'Classify Leaf'}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="result-panel">
          <div className="preview-box">
            {preview ? (
              <img src={preview} alt="Uploaded potato leaf preview" />
            ) : (
              <div className="empty-preview">
                <span>🖼️</span>
                <p>Image preview will appear here</p>
              </div>
            )}
          </div>

          <div className="prediction-card">
            <p className="result-label">Prediction Result</p>

            {result ? (
              <>
                <h2>{result.class_name}</h2>
                <p className="confidence-text">
                  Confidence: <strong>{result.confidence}%</strong>
                </p>

                <div className="probability-list">
                  {Object.entries(result.probabilities).map(([label, value]) => (
                    <div className="probability-row" key={label}>
                      <span>{label}</span>
                      <strong>{value}%</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="waiting-text">
                Upload an image and click classify to see the result.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
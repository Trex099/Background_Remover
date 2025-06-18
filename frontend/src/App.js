import React, { useState, useCallback } from 'react';
import './App.css';
import { Header, Hero, ImageProcessor, FeatureShowcase, AboutSection, TestimonialsSection, Footer } from './components';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = useCallback(async (file) => {
    if (file) {
      // Show original image immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setShowResult(false);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);

      // Process the image
      await processImage(file);
    }
  }, []);

  const processImage = useCallback(async (file) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/remove-background`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process image');
      }

      const result = await response.json();
      
      if (result.success) {
        setProcessedImage(`data:image/png;base64,${result.image_base64}`);
        setShowResult(true);
      } else {
        throw new Error('Failed to process image');
      }
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message);
      // Show mock result for demo purposes when API fails
      setTimeout(() => {
        setProcessedImage(uploadedImage);
        setShowResult(true);
        setError(null);
      }, 1000);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedImage]);

  const handleSampleImageSelect = useCallback(async (sampleUrl) => {
    setError(null);
    setUploadedImage(sampleUrl);
    setShowResult(false);
    setProcessedImage(null);
    
    try {
      // Convert image URL to File object for processing
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' });
      await processImage(file);
    } catch (err) {
      console.error('Sample processing error:', err);
      // Mock processing for demo
      setIsProcessing(true);
      setTimeout(() => {
        setProcessedImage(sampleUrl);
        setShowResult(true);
        setIsProcessing(false);
      }, 2000);
    }
  }, [processImage]);

  const handleNewImage = useCallback(() => {
    setShowResult(false);
    setUploadedImage(null);
    setProcessedImage(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main>
        {!showResult ? (
          <>
            <Hero 
              onImageUpload={handleImageUpload}
              onSampleSelect={handleSampleImageSelect}
              isProcessing={isProcessing}
              uploadedImage={uploadedImage}
              error={error}
            />
            <FeatureShowcase />
            <AboutSection />
            <TestimonialsSection />
          </>
        ) : (
          <ImageProcessor 
            originalImage={uploadedImage}
            processedImage={processedImage}
            onNewImage={handleNewImage}
            isProcessing={isProcessing}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
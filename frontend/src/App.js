import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import { Header, Hero, ImageProcessor, FeatureShowcase, BlogSection, Footer } from './components';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleImageUpload = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setShowResult(false);
        setProcessedImage(null);
        // Simulate processing
        processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const processImage = useCallback((imageUrl) => {
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock processed image - in real scenario, this would be the API response
      setProcessedImage(imageUrl);
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  }, []);

  const handleSampleImageSelect = useCallback((sampleUrl) => {
    setUploadedImage(sampleUrl);
    setShowResult(false);
    setProcessedImage(null);
    processImage(sampleUrl);
  }, [processImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {!showResult ? (
          <>
            <Hero 
              onImageUpload={handleImageUpload}
              onSampleSelect={handleSampleImageSelect}
              isProcessing={isProcessing}
              uploadedImage={uploadedImage}
            />
            <FeatureShowcase />
          </>
        ) : (
          <ImageProcessor 
            originalImage={uploadedImage}
            processedImage={processedImage}
            onNewImage={() => {
              setShowResult(false);
              setUploadedImage(null);
              setProcessedImage(null);
            }}
          />
        )}
        
        <BlogSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
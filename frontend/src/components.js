import React, { useState, useRef, useCallback } from 'react';

// Sample images for demo with diversity
const SAMPLE_IMAGES = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/6484132/pexels-photo-6484132.jpeg?w=400&h=400&fit=crop&crop=face",
    alt: "Diverse professional portrait"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=400&h=400&fit=crop&crop=face",
    alt: "Multicultural business team"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/7550298/pexels-photo-7550298.jpeg?w=400&h=400&fit=crop&crop=face",
    alt: "Diverse team collaboration"
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/3811111/pexels-photo-3811111.jpeg?w=400&h=400&fit=crop&crop=face",
    alt: "Diverse group of people"
  }
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ClearCut
                </span>
                <div className="text-xs text-gray-500 font-medium">100% FREE</div>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Community
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              100% Free Forever
            </div>
            
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-purple-600 font-medium text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-purple-600 font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-purple-600 font-medium text-left"
              >
                Community
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export const Hero = ({ onImageUpload, onSampleSelect, isProcessing, uploadedImage, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            100% Free • Unlimited Usage • No Sign-up Required
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Remove Backgrounds
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              Instantly
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional background removal powered by cutting-edge AI. 
            <span className="font-semibold text-purple-600"> Completely free forever.</span>
            <br />
            <span className="text-lg text-green-600 font-medium">Use as many times as you want - no limits!</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-12">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Unlimited Processing
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              HD Quality Results
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No Watermarks Ever
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Sample showcase */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/6484132/pexels-photo-6484132.jpeg?w=400&h=500&fit=crop&crop=face"
                  alt="Diverse professional sample"
                  className="rounded-xl w-full max-w-sm"
                />
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Original
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Upload area */}
          <div className="lg:w-1/2 w-full max-w-md">
            {uploadedImage && isProcessing ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-100">
                <div className="text-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">✨</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Processing Magic ✨</h3>
                  <p className="text-gray-600">Our AI is carefully removing the background...</p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 ${
                  isDragOver 
                    ? 'border-purple-400 bg-purple-50/80 scale-105' 
                    : 'border-purple-100 hover:border-purple-200'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-bold text-lg mb-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Choose Image
                  </button>
                  
                  <p className="text-gray-500 mb-4">or drag and drop your image here</p>
                  
                  <div className="text-xs text-gray-400 mb-4">
                    Supports: JPG, PNG • Max size: 5MB • <span className="text-green-600 font-semibold">100% Free Forever</span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Sample images */}
            <div className="mt-8">
              <p className="text-center text-sm text-gray-600 mb-4 font-medium">
                ✨ No image? Try these diverse samples:
              </p>
              <div className="flex justify-center space-x-3">
                {SAMPLE_IMAGES.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => onSampleSelect(image.url)}
                    className="w-16 h-16 rounded-xl overflow-hidden hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-white hover:border-purple-200"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ImageProcessor = ({ originalImage, processedImage, onNewImage, isProcessing }) => {
  const [showComparison, setShowComparison] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = () => {
    if (!processedImage) return;
    
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'clearcut-background-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Processing Complete • 100% Free
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Image is Ready! ✨
          </h2>
          
          <p className="text-gray-600 mb-8">
            Background removed with precision AI technology - completely free, no limits!
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setShowComparison(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                showComparison 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Compare Results
            </button>
            <button
              onClick={() => setShowComparison(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                !showComparison 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Final Result
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          {showComparison && (
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                <img
                  src={originalImage}
                  alt="Original"
                  className="rounded-xl shadow-lg max-w-sm w-full"
                />
                <div className="absolute -top-3 left-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  📷 Original
                </div>
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 bg-checker">
                  <img
                    src={processedImage}
                    alt="Background Removed"
                    className="rounded-xl shadow-lg max-w-sm w-full"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ✨ Background Removed
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={downloadImage}
              disabled={isDownloading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isDownloading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download HD Image - FREE
                </span>
              )}
            </button>
            
            <button className="bg-white text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl border border-gray-200">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Result
              </span>
            </button>
          </div>
          
          <button
            onClick={onNewImage}
            className="text-purple-600 hover:text-purple-700 font-bold underline text-lg transition-colors duration-200"
          >
            ✨ Process Another Image - Still Free!
          </button>
        </div>
      </div>
    </section>
  );
};

export const FeatureShowcase = () => {
  const features = [
    {
      icon: "🎯",
      title: "Precision AI",
      description: "Advanced neural networks for pixel-perfect edge detection"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Process images in seconds with optimized algorithms"
    },
    {
      icon: "🎨",
      title: "Perfect Quality",
      description: "No artifacts or rough edges, just clean results"
    },
    {
      icon: "📱",
      title: "Works Everywhere",
      description: "Desktop, mobile, tablet - seamless experience"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your images are processed securely and never stored"
    },
    {
      icon: "💚",
      title: "100% Free Forever",
      description: "No limits, no watermarks, no hidden costs"
    }
  ];

  const showcaseImages = [
    {
      label: "Original Portrait",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100"
    },
    {
      label: "Clean Transparent",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-white",
      isTransparent: true
    },
    {
      label: "New Background",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      label: "Creative Freedom",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-yellow-300 to-orange-400"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">ClearCut</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of background removal with cutting-edge AI technology - completely free!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Showcase Images */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">See the Magic in Action</h3>
          <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-8">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">People</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">Products</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">Objects</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseImages.map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`${item.bgColor} rounded-2xl p-6 mb-4 relative overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg`}>
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-48 object-cover rounded-xl mx-auto"
                  style={item.isTransparent ? { 
                    background: 'url("data:image/svg+xml,%3csvg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\'%3e%3crect width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%\' height=\'100%\' fill=\'url(%23a)\'/%3e%3c/svg%3e")'
                  } : {}}
                />
              </div>
              <p className="text-sm text-gray-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">ClearCut AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Democratizing professional background removal with cutting-edge AI technology, completely free for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              We believe that professional-quality image editing should be accessible to everyone, regardless of their budget or technical expertise. 
              ClearCut AI was created to break down barriers and provide powerful background removal capabilities to creators, entrepreneurs, 
              students, and professionals worldwide.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform serves a diverse global community, welcoming users from all backgrounds, cultures, and industries. 
              Whether you're a small business owner, content creator, student, or just someone who needs a quick background removal, 
              ClearCut AI is here to help - completely free, forever.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-semibold">100% Free Forever</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <span className="font-semibold">No Limits</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556484687-30636164638b?w=600&h=400&fit=crop"
              alt="Diverse hands coming together symbolizing unity and collaboration"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg">
              <span className="font-bold">For Everyone</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&h=400&fit=crop"
              alt="Diverse team working together in a creative environment"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Technology Behind ClearCut</h3>
            <p className="text-gray-600 mb-6">
              ClearCut AI is powered by state-of-the-art machine learning models, specifically the RemBG library, 
              which uses advanced neural networks trained on millions of images to achieve precision background removal.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-purple-600 text-sm font-bold">AI</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Advanced Neural Networks</h4>
                  <p className="text-gray-600 text-sm">Deep learning models trained on diverse datasets for accurate edge detection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Real-time Processing</h4>
                  <p className="text-gray-600 text-sm">Optimized algorithms for lightning-fast background removal</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-sm font-bold">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Privacy-First Design</h4>
                  <p className="text-gray-600 text-sm">Images are processed securely and never stored on our servers</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600">
              We continuously improve our algorithms to ensure the best possible results for our diverse user base, 
              supporting various image types, skin tones, and challenging backgrounds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/3811111/pexels-photo-3811111.jpeg?w=150&h=150&fit=crop&crop=face",
      quote: "ClearCut has been a game-changer for my online store. Professional product photos without the cost!"
    },
    {
      name: "James Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1566044103142-bd07c8b82913?w=150&h=150&fit=crop&crop=face",
      quote: "Amazing quality and completely free! I use it daily for my social media content."
    },
    {
      name: "Aisha Patel",
      role: "Graphic Designer",
      image: "https://images.pexels.com/photos/7550298/pexels-photo-7550298.jpeg?w=150&h=150&fit=crop&crop=face",
      quote: "The AI is incredibly accurate. It saves me hours of manual editing work every week."
    },
    {
      name: "David Johnson",
      role: "Student",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=150&h=150&fit=crop&crop=face",
      quote: "Perfect for my school projects and presentations. Love that it's completely free!"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Global Community</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of creators, entrepreneurs, and professionals who trust ClearCut AI for their background removal needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full shadow-lg">
            <span className="text-2xl font-bold text-gray-900 mr-2">10,000+</span>
            <span className="text-gray-600">Happy users worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "How it Works", "Examples", "FAQ", "Support"]
    },
    {
      title: "Use Cases",
      links: ["E-commerce", "Social Media", "Presentations", "Marketing", "Personal Photos"]
    },
    {
      title: "Resources",
      links: ["Blog", "Tutorials", "Community", "Best Practices", "Tips & Tricks"]
    },
    {
      title: "Company",
      links: ["About Us", "Contact", "Privacy", "Terms", "Accessibility"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ClearCut
                </span>
                <div className="text-xs text-gray-400 font-medium">100% FREE</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Professional background removal powered by cutting-edge AI technology. Free forever, for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ClearCut AI. All rights reserved. Made with ❤️ for everyone.
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Accessibility</a>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Always Free • No Limits • No Watermarks
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
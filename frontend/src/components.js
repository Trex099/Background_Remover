import React, { useState, useRef, useCallback } from 'react';

// Sample images for demo
const SAMPLE_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400&h=400&fit=crop&crop=face",
    alt: "Professional woman in black blazer"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=400&h=400&fit=crop&crop=face",
    alt: "Woman in red cardigan"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/11302135/pexels-photo-11302135.jpeg?w=400&h=400&fit=crop&crop=face",
    alt: "Woman in teal blazer"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    alt: "Skincare products"
  }
];

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">remove.bg</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Upload</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">For Business</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tools & API</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Log in</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Hero = ({ onImageUpload, onSampleSelect, isProcessing, uploadedImage }) => {
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
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Remove Image
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Background
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            100% Automatically and{' '}
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-semibold">
              Free
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Sample image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400&h=500&fit=crop&crop=face"
                alt="Sample before"
                className="rounded-2xl shadow-2xl max-w-sm w-full"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                Before
              </div>
            </div>
          </div>

          {/* Right side - Upload area */}
          <div className="lg:w-1/2 w-full max-w-md">
            {uploadedImage && isProcessing ? (
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing your image...</h3>
                  <p className="text-gray-600">This usually takes a few seconds</p>
                </div>
              </div>
            ) : (
              <div
                className={`bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 ${
                  isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <div className="mb-6">
                    <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg mb-4"
                  >
                    Upload Image
                  </button>
                  
                  <p className="text-gray-500 mb-6">or drop a file</p>
                  
                  <div className="text-xs text-gray-400 mb-6">
                    Paste image or URL
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

            {/* Sample images */}
            <div className="mt-8">
              <p className="text-center text-sm text-gray-600 mb-4">No image? Try one of these:</p>
              <div className="flex justify-center space-x-2">
                {SAMPLE_IMAGES.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => onSampleSelect(image.url)}
                    className="w-16 h-16 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md hover:shadow-lg"
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

export const ImageProcessor = ({ originalImage, processedImage, onNewImage }) => {
  const [showComparison, setShowComparison] = useState(true);

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your processed image is ready!</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowComparison(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showComparison ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => setShowComparison(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !showComparison ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Result Only
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
          {showComparison && (
            <div className="relative">
              <img
                src={originalImage}
                alt="Original"
                className="rounded-xl shadow-lg max-w-sm w-full"
              />
              <div className="absolute -top-3 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                Original
              </div>
            </div>
          )}

          <div className="relative">
            <div className="bg-gray-100 bg-opacity-50 rounded-xl p-4">
              <img
                src={processedImage}
                alt="Processed"
                className="rounded-xl shadow-lg max-w-sm w-full"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <div className="absolute -top-3 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Background Removed
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Download HD
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Share
            </button>
          </div>
          
          <button
            onClick={onNewImage}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Process another image
          </button>
        </div>
      </div>
    </section>
  );
};

export const FeatureShowcase = () => {
  const showcaseImages = [
    {
      label: "Original",
      image: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-purple-100"
    },
    {
      label: "Transparent background",
      image: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-white",
      isTransparent: true
    },
    {
      label: "New background",
      image: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      label: "Endless possibilities",
      image: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=300&h=400&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-yellow-300 to-orange-400"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Just picture it</h2>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <span className="border-b-2 border-blue-600 pb-1">People</span>
            <span>Products</span>
            <span>Animals</span>
            <span>Cars</span>
            <span>Graphics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseImages.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`${item.bgColor} rounded-xl p-6 mb-4 relative overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                  style={item.isTransparent ? { 
                    background: 'url("data:image/svg+xml,%3csvg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\'%3e%3crect width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%\' height=\'100%\' fill=\'url(%23a)\'/%3e%3c/svg%3e")'
                  } : {}}
                />
              </div>
              <p className="text-sm text-gray-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Remove Image Background</h3>
            <p className="text-gray-600 mb-6">Get a transparent background for any image</p>
            
            <div className="mb-6">
              <svg className="w-12 h-12 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg w-full">
              Upload Image
            </button>
            
            <p className="text-xs text-gray-500 mt-4">or drop a file</p>

            <div className="flex justify-center space-x-2 mt-4">
              {SAMPLE_IMAGES.slice(0, 4).map((image) => (
                <div key={image.id} className="w-10 h-10 rounded overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BlogSection = () => {
  const blogPosts = [
    {
      date: "May 09, 2025",
      title: "Improve your editing workflow with background removal API",
      category: "Tutorial"
    },
    {
      date: "Feb 12, 2025",
      title: "Boost sales with AI optimized images",
      category: "Business"
    },
    {
      date: "Feb 10, 2025",
      title: "How to make a background transparent in Paint and Paint 3D",
      category: "Tutorial"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Blog Section */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
              <a href="#" className="text-gray-900 hover:text-gray-700 font-medium">
                See more articles →
              </a>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Updates</h3>
              <p className="text-gray-600 mb-6">
                Sign up for our mailing list to receive news and updates about background removal products and services. You can unsubscribe at any time.
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                *I have checked and agree to the Privacy Policy. I have checked and agree to the Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const footerSections = [
    {
      title: "Learn more",
      links: ["Magic Brush", "Individuals", "Photographers", "Marketing", "Developers", "eCommerce", "Media", "Car Dealerships", "Enterprise", "Success stories"]
    },
    {
      title: "Tools & API",
      links: ["API Documentation", "Integrations, tools & apps", "Photoshop Extension", "Windows / Mac / Linux", "Android App", "Design Templates"]
    },
    {
      title: "Support",
      links: ["Help & FAQ", "Contact Us", "Refunds", "Platform Status"]
    },
    {
      title: "Company",
      links: ["Blog", "Affiliate Program", "Create automatic designs", "Video Background Removal", "Careers", "About Us", "Press & Partnerships"]
    }
  ];

  return (
    <>
      {/* Trustpilot section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-white text-sm">4.8 stars on Trustpilot</p>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
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
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold">remove.bg</span>
              </div>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">General Terms and Conditions</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">Imprint</a>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm mt-8">
              © Kaleido AI GmbH • Lindenstraße 1 • 8200 5 Schaffhausen, Switzerland
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
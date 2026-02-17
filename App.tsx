
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { findSimilarProducts } from './services/geminiService';
import type { SearchResult, ImageData } from './types';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (imageData: ImageData) => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    setUserImage(imageData.url);

    try {
      const results = await findSimilarProducts(imageData);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      setError('Failed to find matching products. The model may be unavailable or the image format is not supported. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setUserImage(null);
    setSearchResults(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!userImage && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-2">Find Your Perfect Match</h2>
            <p className="text-center text-gray-500 mb-8">Upload an image or enter a URL to discover visually similar products from our collection.</p>
            <ImageUploader onSearch={handleSearch} disabled={isLoading} />
          </div>
        )}
        
        {isLoading && <Loader />}
        
        {error && (
            <div className="max-w-3xl mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={handleReset} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Try Again
                </button>
            </div>
        )}

        {!isLoading && !error && searchResults && userImage && (
          <ResultsDisplay 
            userImage={userImage} 
            results={searchResults}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;
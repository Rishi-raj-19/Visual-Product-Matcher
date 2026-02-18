import React, { useState, useMemo } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ProductCard } from './components/ProductCard';
import { FilterBar } from './components/FilterBar';
import { products } from './data/products';
import { findSimilarProducts } from './services/geminiService';
import { EnrichedProduct } from './types';

function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [results, setResults] = useState<EnrichedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [minSimilarity, setMinSimilarity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, []);

  const handleImageSelected = async (base64: string, mimeType: string, previewUrl: string) => {
    setCurrentImage(previewUrl);
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setResults([]); // Clear previous results
    
    // Reset filters on new search
    setMinSimilarity(0);
    setSelectedCategory('All');

    try {
      const matchResults = await findSimilarProducts(base64, mimeType, products);
      
      // Merge match results with product details
      const enriched = matchResults.map(match => {
        const product = products.find(p => p.id === match.productId);
        if (!product) return null;
        return {
          ...product,
          matchData: match
        };
      }).filter((item) => item !== null) as EnrichedProduct[];

      setResults(enriched);
      
      // Auto-set filter based on results quality to show relevant items, 
      // but ensure we don't hide everything if scores are generally low.
      if (enriched.length > 0) {
        const scores = enriched.map(r => r.matchData?.similarityScore || 0);
        // Default filter to slightly below the worst match returned by AI, or 0 if user wants all
        // Let's default to 0 to show everything returned, user can filter up.
        setMinSimilarity(0);
      }

    } catch (err) {
      setError("Failed to analyze image. Please check your API key and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResults = useMemo(() => {
    return results.filter(p => {
      const matchesScore = (p.matchData?.similarityScore || 0) >= minSimilarity;
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesScore && matchesCategory;
    });
  }, [results, minSimilarity, selectedCategory]);

  const handleReset = () => {
    setCurrentImage(null);
    setHasSearched(false);
    setResults([]);
    setError(null);
    setMinSimilarity(0);
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
             <div className="bg-indigo-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <h1 className="text-xl font-bold text-slate-900 tracking-tight">Visual Product Matcher</h1>
          </div>
          {currentImage && (
             <button onClick={handleReset} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition">
                New Search
             </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro / Search State */}
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-10 max-w-lg">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Find what matches your style.</h2>
              <p className="text-lg text-slate-600">Upload an image to search our catalog using advanced Gemini AI visual analysis.</p>
            </div>
            <ImageUploader onImageSelected={handleImageSelected} isLoading={isLoading} />
            
            {/* Show a few random featured products as a teaser */}
            <div className="mt-16 w-full">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">Featured Items</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {products.slice(0, 4).map(p => (
                   <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                      <img src={p.imageUrl} alt={p.name} className="w-full aspect-square object-cover rounded-md mb-2 grayscale hover:grayscale-0 transition" />
                      <p className="text-xs font-semibold text-center">{p.name}</p>
                   </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar / Uploaded Image */}
            <div className="w-full lg:w-1/4 flex-shrink-0 space-y-6">
               <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Your Image</h3>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                     <img src={currentImage!} alt="Uploaded query" className="w-full h-full object-contain" />
                  </div>
                  <div className="mt-4">
                     <button 
                       onClick={handleReset}
                       className="w-full py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                     >
                       Upload Different Image
                     </button>
                  </div>
               </div>
            </div>

            {/* Results Area */}
            <div className="w-full lg:w-3/4">
               {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                     <p className="text-lg text-slate-600 font-medium">Analyzing visual features...</p>
                     <p className="text-sm text-slate-400">Comparing against 50+ products</p>
                  </div>
               ) : error ? (
                 <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-sm underline text-red-700">Reload App</button>
                 </div>
               ) : (
                 <>
                   <FilterBar 
                      minScore={minSimilarity} 
                      setMinScore={setMinSimilarity} 
                      resultCount={filteredResults.length} 
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                   />
                   
                   {filteredResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                   ) : (
                      <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <p className="text-slate-500 text-lg">No products found matching your filters.</p>
                        <div className="mt-4 flex flex-col gap-2 items-center">
                            {selectedCategory !== 'All' && (
                                <button onClick={() => setSelectedCategory('All')} className="text-indigo-600 font-medium hover:underline">
                                    Clear category filter
                                </button>
                            )}
                            {minSimilarity > 0 && (
                                <button onClick={() => setMinSimilarity(0)} className="text-indigo-600 font-medium hover:underline">
                                    Reset similarity threshold
                                </button>
                            )}
                        </div>
                      </div>
                   )}
                 </>
               )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
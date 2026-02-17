
import React, { useState, useMemo } from 'react';
import type { SearchResult } from '../types';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

interface ResultsDisplayProps {
  userImage: string;
  results: SearchResult[];
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ userImage, results, onReset }) => {
  const [similarityFilter, setSimilarityFilter] = useState(50);

  const matchedProducts = useMemo(() => {
    return results
      .map(result => {
        const product = products.find(p => p.id === result.id);
        return product ? { ...product, similarityScore: result.similarityScore } : null;
      })
      .filter(Boolean)
      .filter(p => p!.similarityScore >= similarityFilter);
  }, [results, similarityFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
              <p className="text-gray-500 mt-1">Found {matchedProducts.length} similar product{matchedProducts.length !== 1 ? 's' : ''}.</p>
              <button onClick={onReset} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Start a New Search &rarr;
              </button>
          </div>
          <div className="flex-shrink-0">
              <p className="text-sm font-medium text-gray-600 mb-2 text-center">Your Image</p>
              <img src={userImage} alt="User upload" className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-white"/>
          </div>
      </div>

      {results.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <label htmlFor="similarity" className="block text-sm font-medium text-gray-700">
                  Filter by Similarity Score: <span className="font-bold text-indigo-600">{similarityFilter}%</span>
              </label>
              <input
                  id="similarity"
                  type="range"
                  min="50"
                  max="100"
                  value={similarityFilter}
                  onChange={(e) => setSimilarityFilter(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
          </div>
      )}

      {matchedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matchedProducts.map((product) => (
            product && <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700">No Matches Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting the similarity filter or starting a new search.</p>
        </div>
      )}
    </div>
  );
};

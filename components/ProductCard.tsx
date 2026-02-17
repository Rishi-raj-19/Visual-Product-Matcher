
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product & { similarityScore: number };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const scoreColor = product.similarityScore > 85 ? 'text-green-600' : product.similarityScore > 70 ? 'text-yellow-600' : 'text-orange-500';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold ${scoreColor}`}>
          {Math.round(product.similarityScore)}% Match
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{product.category}</p>
        <h3 className="text-lg font-bold text-gray-800 mt-1 truncate group-hover:text-indigo-600 transition-colors">{product.name}</h3>
      </div>
    </div>
  );
};

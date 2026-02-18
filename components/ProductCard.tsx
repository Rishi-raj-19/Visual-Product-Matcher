import React, { useState } from 'react';
import { EnrichedProduct } from '../types';

interface ProductCardProps {
  product: EnrichedProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  const similarityColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    return 'bg-amber-100 text-amber-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={imgSrc} 
          alt={product.name} 
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={() => setImgSrc(`https://placehold.co/400x400?text=${encodeURIComponent(product.name)}`)}
        />
        {product.matchData && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${similarityColor(product.matchData.similarityScore)}`}>
            {product.matchData.similarityScore}% Match
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</p>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{product.name}</h3>
          </div>
          <span className="font-medium text-slate-900">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>
        
        {product.matchData && (
          <div className="mt-auto pt-3 border-t border-slate-100">
             <p className="text-xs text-slate-500 italic">
               <span className="font-semibold not-italic text-slate-700">Why: </span>
               {product.matchData.reason}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

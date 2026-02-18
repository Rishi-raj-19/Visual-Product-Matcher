import React from 'react';

interface FilterBarProps {
  minScore: number;
  setMinScore: (score: number) => void;
  resultCount: number;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  minScore, 
  setMinScore, 
  resultCount,
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="sticky top-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm rounded-xl p-4 mb-8 flex flex-col xl:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full xl:w-auto">
        <h2 className="text-lg font-bold text-slate-800">Results</h2>
        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{resultCount} Found</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
        
        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 p-1.5 rounded-lg border border-slate-200">
           <label htmlFor="category-select" className="text-sm font-medium text-slate-600 whitespace-nowrap pl-2">
             Category:
           </label>
           <select
             id="category-select"
             value={selectedCategory}
             onChange={(e) => setSelectedCategory(e.target.value)}
             className="bg-white border-0 text-slate-700 text-sm rounded-md focus:ring-2 focus:ring-indigo-500 py-1 pl-2 pr-8 font-medium cursor-pointer hover:bg-slate-50 transition-colors"
           >
             <option value="All">All Categories</option>
             {categories.map(cat => (
               <option key={cat} value={cat}>{cat}</option>
             ))}
           </select>
        </div>

        <div className="hidden sm:block w-px h-8 bg-slate-200 mx-2"></div>

        {/* Similarity Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 p-1.5 rounded-lg border border-slate-200">
          <label htmlFor="similarity-range" className="text-sm font-medium text-slate-600 whitespace-nowrap pl-2">
            Min Match: <span className="text-indigo-600 font-bold w-8 inline-block text-right">{minScore}%</span>
          </label>
          <input 
            id="similarity-range"
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full sm:w-32 h-2 ml-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mr-2"
          />
        </div>
      </div>
    </div>
  );
};
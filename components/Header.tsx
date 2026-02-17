
import React from 'react';
import { CameraIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CameraIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">
              Visual Product Matcher
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

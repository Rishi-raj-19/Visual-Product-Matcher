
import React, { useState, useCallback, useRef } from 'react';
import type { ImageData } from '../types';
import { UploadIcon, LinkIcon } from './icons';

interface ImageUploaderProps {
  onSearch: (imageData: ImageData) => void;
  disabled: boolean;
}

const fileToImageData = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
                const url = event.target.result;
                const base64 = url.split(',')[1];
                resolve({ base64, mimeType: file.type, url });
            } else {
                reject(new Error('Failed to read file.'));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const urlToImageData = async (url: string): Promise<ImageData> => {
    try {
        // Use a reliable CORS proxy for fetching images from other domains in a browser environment.
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        if (!response.ok) {
            if (response.status === 413) {
                throw new Error('Image is too large. Please use an image under 5MB or upload it directly.');
            }
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    const dataUrl = event.target.result;
                    const base64 = dataUrl.split(',')[1];
                    resolve({ base64, mimeType: blob.type, url });
                } else {
                    reject(new Error('Failed to read fetched image blob.'));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    } catch(e) {
        console.error("Error fetching image from URL:", e);
        if (e instanceof Error) {
            throw e;
        }
        throw new Error("Could not fetch image from the provided URL. Please check the URL and ensure it's publicly accessible.");
    }
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onSearch, disabled }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      try {
        const imageData = await fileToImageData(file);
        onSearch(imageData);
      } catch (err) {
        setError('Could not process the selected file.');
      }
    }
  }, [onSearch]);

  const handleUrlSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (imageUrl) {
      setError(null);
      try {
        const imageData = await urlToImageData(imageUrl);
        onSearch(imageData);
      } catch (err: any) {
        setError(err.message || 'Failed to process image from URL.');
      }
    }
  }, [imageUrl, onSearch]);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files?.[0];
      if (file) {
          setError(null);
          try {
              const imageData = await fileToImageData(file);
              onSearch(imageData);
          } catch (err) {
              setError('Could not process the dropped file.');
          }
      }
  }, [onSearch]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex justify-center w-full h-48 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
      >
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <span className="relative font-medium text-indigo-600">
              Upload a file
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
      </label>

      <div className="mt-6 flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="mt-6">
        <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">Paste image URL</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="image-url"
              id="image-url"
              className="bg-white text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={disabled}
            />
          </div>
          <button
            type="submit"
            disabled={!imageUrl || disabled}
            className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
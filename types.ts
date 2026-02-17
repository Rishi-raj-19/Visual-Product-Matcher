
export interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}

export interface SearchResult {
  id: number;
  similarityScore: number;
}

export interface ImageData {
  base64: string;
  mimeType: string;
  url: string; // URL can be a data URL or a remote URL
}

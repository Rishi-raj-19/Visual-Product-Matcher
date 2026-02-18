export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface MatchResult {
  productId: string;
  similarityScore: number;
  reason: string;
}

export interface EnrichedProduct extends Product {
  matchData?: MatchResult;
}

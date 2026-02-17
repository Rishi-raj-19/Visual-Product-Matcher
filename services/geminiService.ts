
import { GoogleGenAI, Type } from "@google/genai";
import type { ImageData, SearchResult } from '../types';
import { products } from '../data/products';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches an image from a URL and converts it to base64.
 * @param url The URL of the image to fetch.
 * @returns A promise that resolves to the image's base64 data and mime type.
 */
const urlToImageData = async (url: string): Promise<{ base64: string; mimeType: string; }> => {
    try {
        // Use a CORS proxy to prevent potential hotlinking or access issues from the image source.
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        if (!response.ok) {
            console.error(`Failed to fetch image. Status: ${response.status} for URL: ${url}`);
            return { base64: '', mimeType: '' };
        }
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    const dataUrl = event.target.result;
                    const base64 = dataUrl.split(',')[1];
                    resolve({ base64, mimeType: blob.type });
                } else {
                    reject(new Error('Failed to read fetched image blob.'));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    } catch(e) {
        console.error(`Error fetching image from URL (${url}):`, e);
        return { base64: '', mimeType: '' }; // Return empty on error to be filtered out
    }
};

/**
 * Uses Gemini to categorize the product in the user's image.
 * @param userImage The user's uploaded image data.
 * @returns A promise that resolves to a category string or null.
 */
const categorizeImage = async (userImage: ImageData): Promise<string | null> => {
  try {
    const model = 'gemini-3-flash-preview';
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const prompt = `Analyze the product in the image. From the following list of categories, which one does it best fit into? 
    Categories: ${uniqueCategories.join(', ')}. 
    Respond with only the single best category name from the list.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { data: userImage.base64, mimeType: userImage.mimeType } },
          { text: prompt },
        ]
      },
    });

    const category = response.text?.trim().toLowerCase();
    if (category && uniqueCategories.includes(category)) {
      return category;
    }
    return null;
  } catch (e) {
    console.error("Failed to categorize image:", e);
    return null;
  }
};


export const findSimilarProducts = async (userImage: ImageData): Promise<SearchResult[]> => {
  const model = 'gemini-3-flash-preview';

  // Step 1: Categorize the user's image to pre-filter for relevant products.
  const identifiedCategory = await categorizeImage(userImage);
  
  let candidateProducts = products;
  if (identifiedCategory) {
    console.log(`Image categorized as: ${identifiedCategory}. Filtering products.`);
    const filteredProducts = products.filter(p => p.category === identifiedCategory);
    if (filteredProducts.length > 0) {
      candidateProducts = filteredProducts;
    } else {
       console.log(`No products found in category '${identifiedCategory}', using all products as fallback.`);
    }
  } else {
    console.log("Could not categorize image, using all products for comparison.");
  }
  
  // 1. Select a random subset of candidate products to compare against for efficiency.
  const shuffled = [...candidateProducts].sort(() => 0.5 - Math.random());
  const selectedProducts = shuffled.slice(0, 12);

  // 2. Fetch and encode image data for the selected products.
  const productImagesData = await Promise.all(
    selectedProducts.map(async (p) => {
        const imageData = await urlToImageData(p.imageUrl);
        return { ...imageData, id: p.id };
    })
  );
  
  const validProductImages = productImagesData.filter(d => d.base64);

  if (validProductImages.length === 0) {
      console.warn("Could not fetch any product images to compare against.");
      return [];
  }

  // 3. Construct a multi-part prompt for visual comparison.
  const prompt = `
    You are a visual product matching expert. Analyze the first image provided, which is the user's target image. Then, compare it against the subsequent product images.

    For each product image, identified by a "Product ID" text following it, provide a visual similarity score from 0 to 100. Base the score on visual characteristics like color, shape, style, and overall aesthetic.

    Return your findings as a JSON array of objects. Each object must contain the 'id' of the product and its 'similarityScore'. Only include products with a similarity score of 50 or higher. Sort the results in descending order of similarityScore. If no products are a good match, return an empty array.
  `;

  const parts: any[] = [
    { inlineData: { data: userImage.base64, mimeType: userImage.mimeType } },
    { text: "This is the user's target image to match." },
    { text: prompt },
  ];

  for (const prodData of validProductImages) {
    parts.push({ inlineData: { data: prodData.base64, mimeType: prodData.mimeType } });
    parts.push({ text: `Product ID: ${prodData.id}` });
  }

  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: parts },
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.NUMBER },
                    similarityScore: { type: Type.NUMBER },
                },
                required: ['id', 'similarityScore'],
            },
        },
    },
  });

  const responseText = response.text?.trim();
  if (!responseText) {
    return [];
  }
  
  try {
    const results: SearchResult[] = JSON.parse(responseText);
    // The model should sort, but we sort again to be safe.
    return results.sort((a, b) => b.similarityScore - a.similarityScore);
  } catch (e) {
    console.error("Failed to parse Gemini response:", responseText);
    throw new Error("Could not understand the model's response.");
  }
};

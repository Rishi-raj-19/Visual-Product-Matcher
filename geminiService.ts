import { GoogleGenAI, Type } from "@google/genai";
import { Product, MatchResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findSimilarProducts = async (
  base64Image: string,
  mimeType: string,
  allProducts: Product[]
): Promise<MatchResult[]> => {
  try {
    // Simplify product list to save tokens, only sending necessary matching info
    const productContext = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: `
              You are an intelligent visual search engine for an e-commerce store.
              
              Task:
              1. Analyze the uploaded image to determine the product type, style, color, material, and visual characteristics.
              2. Compare this analysis against the provided list of products in the store's inventory.
              3. Identify the products that are most visually or semantically similar to the uploaded image.
              4. Consider the price in your similarity analysis where applicable (e.g., similar luxury tier or budget category).
              
              Inventory List (JSON):
              ${JSON.stringify(productContext)}
              
              Output Requirements:
              - Return a JSON object with a key "matches" containing an array of objects.
              - Each object must have:
                - "productId": The exact ID from the inventory list.
                - "similarityScore": A number between 0 and 100 indicating how close of a match it is (100 = exact match).
                - "reason": A brief, 1-sentence explanation of why this product was selected (e.g., "Matches the red color and sneaker style").
              - Include at least 5 matches if possible, even if similarity is lower.
              - Sort the results by similarityScore in descending order.
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productId: { type: Type.STRING },
                  similarityScore: { type: Type.NUMBER },
                  reason: { type: Type.STRING }
                },
                required: ["productId", "similarityScore", "reason"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    const parsedData = JSON.parse(jsonText);
    return parsedData.matches || [];

  } catch (error) {
    console.error("Error matching products:", error);
    throw error;
  }
};
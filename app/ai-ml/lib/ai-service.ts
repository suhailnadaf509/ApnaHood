import axios from 'axios';
import { searchStores, searchStoresByCategory, type Store, type ServiceCategory } from "./database"

interface PredictionResult {
  category: ServiceCategory;
  probabilities: Record<ServiceCategory, number>;
}

class AiService {
  private static instance: AiService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_ML_API_URL || 'http://localhost:5000';
  }

  public static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  async predictCategory(text: string): Promise<PredictionResult> {
    try {
      const response = await axios.post(`${this.baseUrl}/predict`, { text });
      return response.data;
    } catch (error) {
      console.error('Error predicting category:', error);
      throw error;
    }
  }
}

export const aiService = AiService.getInstance();

export async function processUserInput(input: string): Promise<{ message: string; stores: Store[] }> {
  try {
    const prediction = await aiService.predictCategory(input);
    const categoryStores = searchStoresByCategory(prediction.category);
    const keywordStores = searchStores(input);
    
    const allStores = Array.from(new Set([...categoryStores, ...keywordStores]));

    if (allStores.length === 0) {
      return {
        message: `I understand you're looking for ${prediction.category.toLowerCase().replace('_', ' ')} services, but I couldn't find any exact matches. Would you like to see all available services in this category?`,
        stores: categoryStores,
      }
    }

    const serviceType = prediction.category.toLowerCase().replace('_', ' ');
    return {
      message: `Based on your request, I think you're looking for ${serviceType} services. I've found ${allStores.length} providers that might help. Would you like more information about any of these services?`,
      stores: allStores,
    }
  } catch (error) {
    console.error('Error processing input:', error);
    return {
      message: "I'm having trouble processing your request. Please try again or rephrase your question.",
      stores: [],
    }
  }
}
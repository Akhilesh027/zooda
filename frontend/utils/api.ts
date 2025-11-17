// Shared utilities and API helpers extracted from index.tsx
import axios from "axios";

export const API_BASE_URL = "https://api.zooda.in";

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export interface Promotion {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  image: string;
  displayType?: "banner" | "popup" | "general";
  type?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  discountCode?: string;
  couponCode?: string;
  link?: string;
  targetUrl?: string;
  // ...other fields
}

export const getActivePromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/promotion`);
    const data = response.data;
    // Support multiple response shapes (kept from original)
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((promo: any) => ({
        ...promo,
        type: promo.displayType || promo.type,
        targetUrl: promo.link || promo.targetUrl,
        _id: promo._id || promo.id,
      }));
    } else if (Array.isArray(data.promotions)) {
      return data.promotions;
    } else if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching active promotions:", err);
    return [];
  }
};

export const trackPromotionEvent = async (promotionId: string | undefined, type: string) => {
  if (!promotionId) return;
  try {
    await axios.post(`${API_BASE_URL}/api/promotion/${promotionId}/track`, { type });
  } catch (err) {
    console.error(`Failed to track ${type} for promotion`, err);
  }
};

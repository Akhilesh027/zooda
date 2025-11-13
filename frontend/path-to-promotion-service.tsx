const API_BASE_URL = "http://localhost:5000"; // update to your backend URL if needed

export interface Promotion {
  id?: string;
  _id?: string;
  name: string;
  title?: string;
  description: string;
  image?: string;
  imageUrl?: string;
  discountType?: string;
  discountValue?: number;
  discountPercentage?: number;
  couponCode?: string;
  discountCode?: string;
  type?: "banner" | "popup" | "discount" | "coupon" | "bogo";
  isActive: boolean;
  startDate: string;
  endDate: string;
  status?: string;
  targetUrl?: string;
  [key: string]: any;
}

export async function getCompanyPromotions(companyId: string): Promise<Promotion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/promotions/company/${companyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();

    if (result.success && Array.isArray(result.promotions)) {
      return result.promotions;
    }
    return [];
  } catch (error) {
    console.error("Error fetching company promotions:", error);
    return [];
  }
}

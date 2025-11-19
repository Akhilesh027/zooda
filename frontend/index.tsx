import React, { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import logoUrl from './images/logo.png';
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// Interfaces
interface Product {
  _id?: string;
  imageUrl: string;
  price: string;
  category: string;
  name?: string;
  tags?: string[];
  productLink?: string;
  images?: Array<{
    url: string;
    alt?: string;
    isPrimary?: boolean;
  }>;
  companyId?: string;
  companyName?: string;
}

interface Comment {
  userId: string;
  text: string;
  date: Date;
  _id?: string;
}

interface Post {
  _id?: string;
  imageUrl: string;
  mediaUrl?: string;
  category: string;
  likes: number;
  comments: number;
  caption: string;
  content?: string;
  date: string;
  createdAt?: string;
  businessId?: string;
  business?: any;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  views?: number;
  shares?: number;
  likesList?: string[];
  commentsList?: Comment[];
  media?: Array<{
    url: string;
    type: string;
    filename?: string;
    originalName?: string;
    size?: number;
  }>;
}

interface Company {
  _id: string;
  rank: number;
  name: string;
  description: string;
  followers: string;
  trend: string;
  siteUrl: string;
  logoUrl: string;
  posts: Post[];
  postCategories: string[];
  products: Product[];
  productCategories: string[];
  totalPosts?: number;
  totalProducts?: number;
  engagementRate: string | number;
  followersList?: string[];
  businessName?: string;
  businessDescription?: string;
  businessWebsite?: string;
  businessLogo?: string;
  category?: string;
  subcategory?: string;
}

interface User {
  _id?: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}
interface Promotion {
  _id?: string;
  id?: string;
  name: string;
  title?: string;
  description: string;
  image: string;
  imageUrl?: string;
  user?: string;
  business?: string;
  companyId?: string;
  businessId?: string;
  companyName?: string;
  startDate: string;
  endDate: string;
  discountCode?: string;
  couponCode?: string;
  discountType?: string;
  discountValue?: number;
  displayType: "banner" | "popup" | "general"; // Updated field
  type?: string; // Keep for backward compatibility
  isActive: boolean;
  status?: string;
  link?: string; // Updated field name
  targetUrl?: string; // Keep for backward compatibility
  performance?: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
  platforms?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = "http://localhost:5000";

const getActivePromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/promotion`);

    // Handle both response structures
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data.map((promo: any) => ({
        ...promo,
        // Map displayType to type for compatibility with existing code
        type: promo.displayType,
        // Map link to targetUrl for compatibility
        targetUrl: promo.link,
        // Ensure we have the main id field
        _id: promo._id || promo.id,
      }));
    } else if (Array.isArray(response.data.promotions)) {
      return response.data.promotions;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching active promotions:", error);
    return [];
  }
};

const trackPromotionEvent = async (
  promotionId: string | undefined,
  type: string
) => {
  if (!promotionId) return;
  try {
    await axios.post(`${API_BASE_URL}/api/promotion/${promotionId}/track`, {
      type,
    });
  } catch (err) {
    console.error(`Failed to track ${type} for promotion`, err);
  }
};

interface PromotionBannerProps {
  promotion: Promotion;
  onClose?: () => void;
  onClaimOffer: (promotion: Promotion) => void;
}

const PromotionBanner = ({
  promotion,
  onClose,
  onClaimOffer,
}: PromotionBannerProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    trackPromotionEvent(promotion._id, "impression");
  }, [promotion._id]);

  const handleClick = () => {
    trackPromotionEvent(promotion._id, "click");
    onClaimOffer(promotion);
  };

  if (!visible) return null;

  // Use link field if targetUrl is not available
  const targetUrl = promotion.targetUrl || promotion.link;

  return (
    <div className="promotion-banner">
      {onClose && (
        <button className="banner-close" onClick={() => setVisible(false)}>
          ×
        </button>
      )}
      <div className="banner-content" onClick={handleClick}>
        <img
          src={`${promotion.image}`}
          alt={promotion.name}
          className="banner-image"
        />
        <div className="banner-info">
          <h4>{promotion.name}</h4>
          <p>{promotion.description}</p>
          {promotion.discountCode && (
            <span className="discount-code">
              Use code: {promotion.discountCode}
            </span>
          )}
          {promotion.couponCode && (
            <span className="discount-code">
              Use code: {promotion.couponCode}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface PromotionPopupProps {
  promotion: Promotion;
  onClose: () => void;
  onClaimOffer: (promotion: Promotion) => void;
}

const PromotionPopup = ({
  promotion,
  onClose,
  onClaimOffer,
}: PromotionPopupProps) => {
  useEffect(() => {
    // Track impression
    trackPromotionEvent(promotion._id, "impression");

    // Mark promotion as shown
    const shownPromos = JSON.parse(
      localStorage.getItem("shownPromotions") || "[]"
    );
    if (!shownPromos.includes(promotion._id)) {
      shownPromos.push(promotion._id);
      localStorage.setItem("shownPromotions", JSON.stringify(shownPromos));
    }
  }, [promotion._id]);

  const handleClaimOffer = () => {
    trackPromotionEvent(promotion._id, "click");
    onClaimOffer(promotion);
  };

  return (
    <div className="promotion-popup-overlay" onClick={onClose}>
      <div
        className="promotion-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="banner-close" onClick={onClose}>
          ×
        </button>
        <img
          src={promotion.image}
          alt={promotion.name}
          className="promotion-popup-image"
        />
        <div className="promotion-popup-body">
          <h3>{promotion.name}</h3>
          <p>{promotion.description}</p>
          {(promotion.discountCode || promotion.couponCode) && (
            <div className="promotion-code">
              Use code:{" "}
              <strong>{promotion.discountCode || promotion.couponCode}</strong>
            </div>
          )}
          <button
            className="promotion-popup-claim-btn"
            onClick={handleClaimOffer}
          >
            Claim Offer Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface SearchResult {
  id: string;
  name: string;
  type: "company" | "product";
  companyId?: string;
  companyName?: string;
  imageUrl?: string;
  price?: string;
}

// ---------------- SEARCH PAGE ----------------
interface SearchPageProps {
  searchQuery: string;
  onSelectSearchResult: (result: any) => void;
  onSearchChange: (query: string) => void;
  onBack: () => void;
  searchResults: any[];
  loading: boolean;
}
const SearchPage = ({
  onSelectSearchResult,
  onSearchChange,
  onBack,
}: {
  onSelectSearchResult: (product: any) => void;
  onSearchChange: (query: string) => void;
  onBack: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    // Mock data for demo
    if (API_BASE_URL.includes("localhost")) {
      const mockData = [
        {
          _id: "b1",
          businessName: "The Organic Store",
          businessDescription: "Fresh and organic groceries.",
          businessCategory: "Groceries",
          logoUrl: "https://placehold.co/80x80/004d40/ffffff?text=ORG",
          products: [
            { _id: "p1", name: "Organic Apples", price: 150, category: "Fruit", tags: ["fresh", "fruit"], image: { url: "https://placehold.co/300x200/ff4d4d/ffffff?text=Apple" } },
            { _id: "p2", name: "Whole Wheat Bread", price: 80, category: "Bakery", tags: ["bread", "whole grain"], image: { url: "https://placehold.co/300x200/ff9900/ffffff?text=Bread" } },
          ],
        },
        {
          _id: "b2",
          businessName: "Tech Hub Electronics",
          businessDescription: "Latest gadgets and accessories.",
          businessCategory: "Electronics",
          logoUrl: "https://placehold.co/80x80/333333/00ccff?text=TECH",
          products: [
            { _id: "p4", name: "Wireless Mouse", price: 599, category: "Accessory", tags: ["computer", "office"], image: { url: "https://placehold.co/300x200/007bff/ffffff?text=Mouse" } },
            { _id: "p5", name: "4K Monitor - UltraSharp", price: 25000, category: "Display", tags: ["gaming", "work"], image: { url: "https://placehold.co/300x200/9933ff/ffffff?text=Monitor" } },
          ],
        },
      ];
      setBusinesses(mockData);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/business/search`);
      const data = await res.json();
      if (data.success && Array.isArray(data.businesses)) {
        setBusinesses(data.businesses);
      }
    } catch (err) {
      console.error("Error fetching businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const filtered = businesses.filter((business) => {
    const lowerQuery = searchQuery.toLowerCase();
    const businessMatches =
      business.businessName?.toLowerCase().includes(lowerQuery) ||
      business.businessDescription?.toLowerCase().includes(lowerQuery) ||
      business.businessCategory?.toLowerCase().includes(lowerQuery);

    const productMatches = business.products?.some((product: any) =>
      product.name?.toLowerCase().includes(lowerQuery) ||
      product.category?.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    );

    return businessMatches || productMatches;
  });

  return (
    <div className="sp-search-page">
      {/* Header */}
      <header className="sp-app-header">
        <button onClick={onBack} className="sp-back-button">
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="sp-search-input-wrapper">
          <span className="material-icons sp-search-icon">search</span>
          <input
            type="text"
            placeholder="Search businesses and products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="sp-search-page-input"
          />
          {searchQuery && (
            <button className="sp-search-clear" onClick={() => setSearchQuery("")}>
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="sp-search-results-container">
        {loading ? (
          <div className="sp-search-loading">Loading businesses...</div>
        ) : filtered.length === 0 ? (
          <div className="sp-search-no-results">No businesses or products found.</div>
        ) : (
          filtered.map((business) => (
            <div key={business._id} className="sp-business-block">
              <div className="sp-business-card">
                <img
                  src={business.logoUrl || "https://placehold.co/80x80?text=Logo"}
                  alt={business.businessName}
                  className="sp-business-logo"
                />
                <div className="sp-business-info">
                  <h3>{business.businessName}</h3>
                  <div className="sp-company-stats">
                    <span>followers: {business.followers}</span>
                    <span>ER: {business.engagementRate}</span>
                    <a href={business.businessWebsite || '#'} target="_blank" rel="noopener noreferrer">
                      <button className="sp-visit-btn">Visit site</button>
                    </a>
                  </div>
                  <p>{business.businessDescription}</p>
                </div>
              </div>

              {/* Products */}
              {business.products?.length > 0 ? (
                <div className="sp-products-grid">
                  {business.products
                    .filter((product: any) => {
                      if (!searchQuery) return true;
                      const lowerQuery = searchQuery.toLowerCase();
                      return (
                        product.name?.toLowerCase().includes(lowerQuery) ||
                        product.category?.toLowerCase().includes(lowerQuery) ||
                        product.tags?.some((tag: string) =>
                          tag.toLowerCase().includes(lowerQuery)
                        )
                      );
                    })
                    .map((product: any) => (
                      <div
                        key={product._id}
                        className="sp-product-card"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="sp-product-details-text">
                          <p>
                            Product: <span className="sp-product-name">{product.name}</span>
                          </p>
                          <p>
                            Price: <span className="sp-product-price-text">₹{product.price || "N/A"}</span>
                          </p>
                        </div>
                        <button
                          className="sp-view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                        >
                          <span className="material-icons">visibility</span>
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="sp-no-products">No products listed for this business.</div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Popup */}
      {selectedProduct && (
        <div className="sp-image-popup-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="sp-image-popup" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedProduct.image?.url || "https://placehold.co/300x200?text=Product"}
              alt={selectedProduct.name}
            />
            <div className="sp-popup-details">
              <h3>{selectedProduct.name}</h3>
              <span className="sp-popup-price">₹{selectedProduct.price || "N/A"}</span>
              <a href={selectedProduct.productLink || '#'} target="_blank" rel="noopener noreferrer">
                <button
                  className="sp-select-product-btn"
                  onClick={() => {
                    onSelectSearchResult(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Select Product
                </button>
              </a>
            </div>
            <button
              className="sp-close-popup"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .sp-search-page { background: #000; color: #fff; min-height: 100vh; }
        .sp-app-header { display: flex; align-items: center; padding: 0.8rem 1rem; border-bottom: 1px solid #222; background: #000; position: sticky; top: 0; z-index: 10; }
        .sp-back-button { background: none; border: none; color: #fff; cursor: pointer; }
        .sp-search-input-wrapper { display: flex; align-items: center; background: #111; border-radius: 8px; padding: 0.4rem 0.8rem; flex: 1; margin-left: 0.8rem; }
        .sp-search-page-input { flex: 1; background: transparent; border: none; color: #fff; outline: none; font-size: 1rem; }
        .sp-search-icon { color: #aaa; margin-right: 0.4rem; }
        .sp-search-clear { background: none; border: none; color: #aaa; cursor: pointer; }

        .sp-business-block { background: #111; border-radius: 12px; margin: 1rem; padding: 1rem; box-shadow: 0 0 6px rgba(255, 255, 255, 0.05); }
        .sp-business-card { display: flex; align-items: center; border-bottom: 1px solid #222; padding-bottom: 1rem; margin-bottom: 1rem; }
        .sp-business-logo { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; margin-right: 1rem; }
        .sp-business-info h3 { margin: 0; color: #fff; font-size: 1.1rem; }
        .sp-business-info p { margin: 2px 0; color: #bbb; font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .sp-company-stats{
            font-size: 0.75rem;
    gap: 20px;
            display: flex;
        justify-content: space-between;
        align-items: center;
        }
        .sp-company-stats span { font-size: 0.75rem; color: #888; }
        .sp-products-grid { display: flex; flex-direction: column; gap: 0.6rem; }
        .sp-product-card { background: #1a1a1a; border-radius: 10px; padding: 0.8rem 1rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 0 4px rgba(255, 255, 255, 0.05); cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .sp-product-card:hover { background: #222; transform: translateY(-1px); }
        .sp-product-details-text { flex: 1; display: flex; flex-direction: column; text-align: left; min-width: 0; }
        .sp-product-details-text p { margin: 0; line-height: 1.4; color: #ccc; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sp-product-name { font-weight: 600; color: #fff; }
        .sp-product-price-text { color: #00ff99; font-weight: 600; }
        .sp-view-btn { background: #4CAF50; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; margin-left: 15px; flex-shrink: 0; }
        .sp-visit-btn { background: #4CAF50; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 0.85rem }
        .sp-no-products, .sp-search-loading, .sp-search-no-results { padding: 1rem; color: #aaa; text-align: center; font-style: italic; }

        .sp-image-popup-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .sp-image-popup { background: #111; padding: 1.5rem; border-radius: 12px; position: relative; width: 90%; max-width: 380px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5); text-align: center; }
        .sp-image-popup img { width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); }
        .sp-popup-details h3 { margin: 0 0 0.5rem 0; color: #fff; font-size: 1.4rem; }
        .sp-popup-price { color: #00ff99; margin-top: 4px; font-weight: 700; font-size: 1.2rem; display: block; margin-bottom: 1rem; }
        .sp-select-product-btn { background: #00ff99; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; width: 100%; transition: background 0.2s; }
        .sp-select-product-btn:hover { background: #00e685; }
        .sp-close-popup { position: absolute; top: 10px; right: 10px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1rem; cursor: pointer; }
      `}</style>
    </div>
  );
};

// ---------------- HEADER COMPONENT ----------------
interface HeaderProps {
  title?: string;
  onBack?: () => void;
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onRegister?: () => void;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  title,
  onBack,
  user,
  onLogin,
  onLogout,
  onRegister,
  onMenuToggle,
  isMenuOpen,
  onSearchClick,
  onProfileClick,
}: HeaderProps) => {
  if (onBack) {
    return (
      <header className="app-header app-header--navigation">
        <button onClick={onBack} className="back-button" aria-label="Go back">
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="header-title">{title}</h1>
        <div className="header-placeholder" />
      </header>
    );
  }

  if (title) {
    return (
      <header className="app-header app-header--centered">
        <h1 className="header-title">{title}</h1>
      </header>
    );
  }

  return (
    <header className="app-header">
      <div className="header-logo" aria-label="Zetova logo">
        <img src={logoUrl} alt="Logo" className="logo-image" />
      </div>
      <div className="search-container" onClick={onSearchClick}>
        <span className="material-icons">search</span>
        <input
          type="text"
          placeholder="Search companies and products..."
          readOnly
          className="search-input"
        />
      </div>
      <div className="account-section">
        {user ? (
          <button
            onClick={onProfileClick}
            className="menu-button"
            aria-label="View Profile"
            title="View Profile"
          >
            <span className="material-icons">account_circle</span>
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="menu-button"
            aria-label="Login"
            title="Login"
          >
            <span className="material-icons">login</span>
          </button>
        )}
      </div>
      <button
        className="menu-button"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
      </button>
    </header>
  );
};
const UserProfilePage = ({
  user,
  onBack,
  onSelectCompany,
  onLogout,
  allCompanies,
  API_BASE_URL,
  axios,
}: UserProfilePageProps) => {
  const [followingBusinesses, setFollowingBusinesses] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
    website: user.website || "",
  });
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [saveLoading, setSaveLoading] = useState(false);

  // Function to fetch followed businesses
  const fetchFollowingBusinesses = useCallback(async () => {
    if (!user._id) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${API_BASE_URL}/api/user/${user._id}/following`
      );
      const followedCompanyIds = response.data.following || [];
      const followedCompanies = allCompanies.filter((company) =>
        followedCompanyIds.includes(company._id)
      );
      setFollowingBusinesses(followedCompanies);
    } catch (err: any) {
      console.error("Error fetching followed businesses:", err);
      setError(
        err.response?.data?.message || "Failed to load followed businesses."
      );
    } finally {
      setLoading(false);
    }
  }, [user._id, allCompanies, API_BASE_URL, axios]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // In a real app, you would handle image upload here
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      setError("");
      // Update user profile API call
      // NOTE: In a real app, you'd upload the image file and send back the resulting URL
      await axios.put(`${API_BASE_URL}/api/user/${user._id}`, {
        ...formData,
        profileImage // Sending the temporary URL for display purposes only in this mockup
      });
      setIsEditing(false);
      // Success: Optionally update the user prop via a parent callback here.
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      website: user.website || "",
    });
    setProfileImage(user.profileImage || "");
    setIsEditing(false);
  };

  useEffect(() => {
    fetchFollowingBusinesses();
  }, [fetchFollowingBusinesses]);

  return (
    <div className="user-profile-page">
      <style>{profilepage}</style>

      <main className="profile-content">
        {error && (
          <div className="error-state">
            <span className="material-icons">error_outline</span>
            <p>{error}</p>
          </div>
        )}
        
        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-header-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-container">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-avatar" />
                ) : (
                  <span className="material-icons profile-avatar-icon">account_circle</span>
                )}
                {isEditing && (
                  <label htmlFor="profile-image-upload" className="avatar-upload-label">
                    <span className="material-icons">edit</span>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="avatar-upload-input"
                    />
                  </label>
                )}
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="edit-profile-btn"
                >
                  <span className="material-icons">edit</span>
                  Edit Profile
                </button>
              )}
            </div>

            <div className="profile-details">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your website URL"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      onClick={handleCancelEdit}
                      className="btn btn-outline"
                      disabled={saveLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="btn btn-primary"
                      disabled={saveLoading}
                    >
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-info">
                  <h1 className="user-name">{user.name}</h1>
                  <p className="user-email">{user.email}</p>
                  {user.phone && <p className="user-phone">Phone: {user.phone}</p>}
                  {user.website && (
                    <a href={user.website} className="user-website" target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  )}
                  {user.bio && <p className="user-bio">{user.bio}</p>}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Following Section */}
        <section className="following-section">
            <div className="section-header">
                <h2>Businesses I Follow</h2>
                <span className="follow-count">{followingBusinesses.length} following</span>
            </div>

            {loading ? (
                <div className="loading-state">
                    <span className="material-icons">hourglass_empty</span>
                    <p>Loading followed businesses...</p>
                </div>
            ) : followingBusinesses.length === 0 ? (
                <div className="empty-state">
                    <span className="material-icons">not_interested</span>
                    <p>You aren't following any businesses yet.</p>
                    <p className="empty-subtext">Find exciting companies to follow!</p>
                </div>
            ) : (
                <div className="businesses-grid">
                    {followingBusinesses.map((company) => (
                        <div 
                            key={company._id} 
                            className="business-card"
                            onClick={() => onSelectCompany(company)}
                        >
                            <div className="business-avatar">
                                {company.logoUrl ? (
                                    <img 
                                        src={company.logoUrl} 
                                        alt={company.name}
                                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/50x50/363636/A8A8A8?text=C'; }}
                                    />
                                ) : (
                                    <span className="material-icons">business</span>
                                )}
                            </div>
                            <div className="business-info">
                                <p className="business-name">{company.name}</p>
                                <p className="business-category">{company.category}</p>
                                <div className="business-stats">
                                    <span className="stat">
                                        <span className="material-icons">group</span>
                                        {company.followers}
                                    </span>
                                    <span className="stat">
                                        <span className="material-icons">article</span>
                                        {company.posts}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>

        {/* Logout Section */}
        <section className="logout-section">
          <button onClick={onLogout} className="btn btn-danger logout-btn">
            <span className="material-icons">logout</span>
            Logout
          </button>
        </section>
      </main>
    </div>
  );
};
const profilepage = `
.user-profile-page {
  /* Set overall background to black */
  background: #000000;
  min-height: 100vh;
  color: #ffffff;
}

.user-profile-page .profile-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #363636;
  background: #000000;
  position: sticky;
  top: 0;
  z-index: 100;
}

.user-profile-page .back-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.user-profile-page .back-button:hover {
  background: #1f1f1f; /* Darker hover for black background */
}

.user-profile-page .profile-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.user-profile-page .profile-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-profile-page .profile-section {
  margin-bottom: 30px;
}

.user-profile-page .profile-header-card {
  background: #121212; /* Slightly off-black card background */
  border: 1px solid #363636;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.profile-avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #363636;
}

.profile-avatar-icon {
  font-size: 120px;
  color: #555555;
}

.avatar-upload-label {
  position: absolute;
  bottom: 5px;
  right: 5px;
  /* Green color */
  background: #4ade80; 
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #000000;
}

.avatar-upload-label .material-icons {
  font-size: 18px;
  color: #000000; /* Text on green should be black/dark */
}

.avatar-upload-input {
  display: none;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #363636;
  border: 1px solid #555555;
  border-radius: 6px;
  padding: 8px 16px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.edit-profile-btn:hover {
  background: #555555;
}

.profile-details {
  flex: 1;
}

.profile-info .user-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
}

.profile-info .user-email {
  font-size: 16px;
  color: #a8a8a8;
  margin: 0 0 12px 0;
}

.profile-info .user-phone,
.profile-info .user-website {
  font-size: 14px;
  color: #a8a8a8;
  margin: 0 0 8px 0;
  display: block;
}

.profile-info .user-website {
  /* Green link color */
  color: #4ade80; 
  text-decoration: none;
}

.profile-info .user-website:hover {
  text-decoration: underline;
  /* Darker green on hover */
  color: #16a34a; 
}

.profile-info .user-bio {
  font-size: 16px;
  line-height: 1.5;
  color: #ffffff;
  margin: 16px 0 0 0;
}

/* Edit Form Styles */
.edit-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  width: 100%;
  background: #000000;
  border: 1px solid #363636;
  border-radius: 6px;
  padding: 12px;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  /* Green focus border */
  border-color: #4ade80; 
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* Button Styles */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.user-profile-page .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.user-profile-page .btn-outline {
  background: transparent;
  border: 1px solid #363636;
  color: #ffffff;
}

.user-profile-page .btn-outline:hover:not(:disabled) {
  background: #363636;
}

/* Primary Button (Green) */
.user-profile-page .btn-primary {
  background: #4ade80; /* Primary Green */
  color: #000000; /* Black text for contrast */
}

.user-profile-page .btn-primary:hover:not(:disabled) {
  background: #16a34a; /* Darker Green on hover */
  color: #ffffff;
}

/* Danger Button (Red) */
.user-profile-page .btn-danger {
  background: #dc2626;
  color: #ffffff;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

/* Following Section */
.following-section {
  background: #121212; /* Slightly off-black card background */
  border: 1px solid #363636;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.follow-count {
  font-size: 14px;
  color: #000000;
  background: #4ade80; /* Green badge */
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #a8a8a8;
}

.loading-state .material-icons,
.error-state .material-icons,
.empty-state .material-icons {
  font-size: 48px;
  margin-bottom: 16px;
  color: #555555;
}

.error-state .material-icons {
  color: #dc2626;
}

.empty-subtext {
  font-size: 14px;
  margin-top: 8px;
  color: #666666;
}

/* Businesses Grid */
.businesses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.business-card {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.business-card:hover {
  border-color: #4ade80; /* Green hover border */
  transform: translateY(-2px);
}

.business-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #363636;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.business-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.business-avatar .material-icons {
  font-size: 24px;
  color: #a8a8a8;
}

.business-info {
  flex: 1;
}

.business-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.business-category {
  font-size: 14px;
  color: #a8a8a8;
  margin: 0 0 8px 0;
}

.business-stats {
  display: flex;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #a8a8a8;
}

.stat .material-icons {
  font-size: 14px;
}

/* Logout Section */
.logout-section {
  text-align: center;
  padding: 20px 0;
}

.logout-btn {
  min-width: 120px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-content {
    padding: 16px;
  }

  .profile-header-card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  /* Ensure profile details align left in edit form on mobile */
  .profile-header-card .profile-details {
  width: 100%;
    text-align: left;
  }


  .profile-avatar-section {
    width: 100%;
  }

  .businesses-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .form-actions {
    /* Stack buttons vertically on small screens */
    flex-direction: column;
    gap: 8px; /* Slightly reduced gap for stacked buttons */
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  /* Reduce padding on the main card */
  .user-profile-page .profile-header-card {
    padding: 16px;
  }

  .profile-avatar-container {
    width: 100px;
    height: 100px;
  }

  .profile-avatar-icon {
    font-size: 100px;
  }

  .profile-info .user-name {
    font-size: 24px;
  }
}
`;
const styleSheets = document.createElement("style");
styleSheets.innerText = profilepage;
document.head.appendChild(styleSheets);
const PrivacyPolicyPage = () => {
  return (
      <div className="min-h-screen bg-black px-5 py-8 text-white">
        <div className="max-w-3xl mx-auto bg-black border border-white/10 rounded-xl p-6 shadow-lg">

          {/* HEADER */}
          <header className="mb-6">
            <h2 className="text-3xl font-extrabold text-green-400">Privacy Policy — Zooda.in</h2>
            <p className="text-sm text-gray-400 mt-1">Last updated: 20 November 2025</p>
          </header>

          {/* MAIN CONTENT */}
          <section className="space-y-6 text-gray-300 leading-relaxed">

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Information We Collect</h3>
              <p>
                We collect personal info you provide (name, email, phone, business details),
                automatic data (IP, device, analytics), and data from third-party sign-ins.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">How We Use Your Information</h3>
              <p>
                To display listings, improve services, power engagement rankings, enable ads,
                and provide customer support. We do not sell personal data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Cookies & Tracking</h3>
              <p>
                Cookies are used to keep you logged in and analyze site performance.
                Disabling cookies may affect certain features.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Third Party Services</h3>
              <p>
                We use third-party services for hosting, analytics, and advertising.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Data Rights</h3>
              <p>
                You may request access or deletion of your data at:
                <a href="mailto:zoodanew@gmail.com" className="text-green-400 underline ml-1">
                  zoodanew@gmail.com
                </a>
              </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/?type=home"
                className="px-5 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-600 transition"
              >
                Back to Home
              </a>

             
            </div>
          </section>

          {/* MOBILE-FRIENDLY EXTENDED SECTION */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <h4 className="font-semibold text-white mb-2 text-lg">Detailed Breakdown</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Personal info during signup or business listing.</li>
              <li>Device, IP, and behavioral analytics.</li>
              <li>Third-party login information.</li>
            </ol>

            <h4 className="font-semibold mt-6 mb-2 text-white">Sharing & Security</h4>
            <p className="text-gray-300">
              Shared only with service providers and legal authorities when required.
              Protected with SSL, server-level security, and audits.
            </p>
          </div>
        </div>
      </div>
  );
};

const TermsPage = () => {
  return (
      <div className="min-h-screen bg-black px-5 py-8 text-white">
        <div className="max-w-3xl mx-auto bg-black border border-white/10 rounded-xl p-6 shadow-lg">
          
          <header className="mb-6">
            <h2 className="text-3xl font-extrabold text-green-400">Terms & Conditions — Zooda.in</h2>
            <p className="text-sm text-gray-400 mt-1">Last updated: 20 November 2025</p>
          </header>

          <section className="space-y-6 leading-relaxed text-gray-300">

            <p>
              By using Zooda.in, you agree to the terms below. Please read carefully before listing
              or interacting with our platform.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Eligibility & Listings</h3>
              <p>
                Users must be 18+ and authorized to manage the business listing. You must own the
                content you upload.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Engagement-Based Ranking</h3>
              <p>
                Listings are ranked based on engagement such as likes, comments, and shares.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Advertising & Payments</h3>
              <p>
                Paid promotions follow advertising policies. Refund eligibility depends on internal review.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-1">User Conduct</h3>
              <p>
                Manipulation of rankings using bots or fake accounts is prohibited and may lead to suspension.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/?type=home"
                className="px-5 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-600 transition"
              >
                Browse Listings
              </a>

           
            </div>

          </section>
        </div>
      </div>
  );
};
const AboutPage = () => {
  return (
  
      <div className="min-h-screen bg-black px-5 py-8 text-white">
        <section className="max-w-5xl mx-auto bg-black border border-white/10 rounded-xl shadow-xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* LEFT SIDE */}
            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-extrabold mb-3">
                Welcome to <span className="text-green-400">Zooda.in</span>
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                Zooda helps website-powered businesses shine with modern listings and
                engagement-driven visibility.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="/?type=home"
                  className="px-5 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-600 transition">
                  Explore Listings
                </a>
                <a href="/contact"
                  className="px-5 py-3 rounded-full border border-green-500 text-green-400 hover:bg-white/5 transition">
                  Advertise with us
                </a>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-6 md:p-10 bg-gradient-to-br from-black to-white/5">
              <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
              <p className="text-gray-300 mb-4">
                Empower every website-powered business with meaningful digital visibility.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2">How We Help</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Boost visibility through engagement</li>
                <li>• Rankings based on fairness, not money</li>
                <li>• Smart ad placements</li>
                <li>• Mobile-first browsing experience</li>
              </ul>
            </div>
          </div>

          {/* BOTTOM CONTENT */}
          <div className="px-6 md:px-10 py-8">
            <h3 className="text-xl font-bold mb-3">Why We Built Zooda.in</h3>

            <p className="text-gray-300 mb-4">
              We built a platform where true engagement—not paid promotions—elevates businesses.
            </p>

            <h4 className="text-lg font-semibold mb-2">Our Promise</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Transparent, engagement-driven rankings</li>
              <li>Tools for small and large businesses</li>
              <li>Continuous updates based on user feedback</li>
              <li>Privacy-first platform</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact"
                className="px-6 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-600">
                Contact Sales
              </a>

              <a href="/?type=home"
                className="px-6 py-3 rounded-full border border-green-500 text-green-400 hover:bg-white/5">
                Browse Businesses
              </a>

            </div>
          </div>
        </section>
      </div>
 
  );
};

interface CompanyListItemProps {
  company: Company;
  onSelectCompany: (company: Company) => void;
  user?: User;
  onLoginClick?: () => void; // ✅ callback to open login form
}
const CompanyListItem = ({
  company,
  onSelectCompany,
  user,
  onLoginClick,
}: CompanyListItemProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState<number>(
    Number(company.followers) || 0
  );

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user?._id && company._id) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/follow/${company._id}/status/${user._id}`
          );
          if (response.data.success) {
            setIsFollowing(response.data.isFollowing);
            if (typeof response.data.followers === "number") {
              setFollowers(response.data.followers);
            }
          }
        } catch (err) {
          console.error("Error checking follow status:", err);
        }
      }
    };
    checkFollowStatus();
  }, [user?._id, company._id]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user?._id) {
      // ✅ Open login form instead of alert
      if (onLoginClick) {
        onLoginClick();
      }
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/follow/${company._id}`,
        { userId: user._id }
      );
      if (response.data.success) {
        setIsFollowing(response.data.isFollowing);
        setFollowers(Number(response.data.followers) || 0);
      }
    } catch (err: any) {
      console.error("Follow error:", err);
    }
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(company.siteUrl, "_blank");
  };

  return (
    <article
      className="company-card"
      onClick={() => onSelectCompany(company)}
      aria-labelledby={`company-name-${company.rank}`}
      role="button"
      tabIndex={0}
    >
      <div className="company-row single-line">
        <img src={company.logoUrl} alt="Logo" className="company-logo" />
        <div className="company-info">
          
          <h2 id={`company-name-${company.rank}`} className="company-name">
            {company.name}
          </h2>


          <div className="company-stats">
            {/* ✅ Always show correct follower count */}
            <span>{followers} Followers</span>
       
{company.engagementRate > 0 ? (
  <div className="stat-item">
    <span className="stat-number">{company.engagementRate}%</span>
    <span className="stat-label">Engagement</span>
  </div>
) : (
  <div className="stat-item">
    <span className="stat-label">NEW</span>
  </div>
)}

            <button className="visit-btn" onClick={handleVisit}>
              Visit site
            </button>
            <button
              className={`follow-btn ${isFollowing ? "following" : ""}`}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow +"}
            </button>
          </div>

          <p className="company-description">{company.description}</p>
        </div>
      </div>
    </article>
  );
};

interface CompanyListItemProps {
  company: Company;
  onSelectCompany: (company: Company) => void;
  user?: User;
  onLoginClick?: () => void; // ✅ callback to open login form
}


interface CompanyListPageProps {
  onSelectCompany: (company: Company) => void;
  user?: User;
  allPromotions: Promotion[];
  onClaimOffer: (promotion: Promotion) => void;
}

const CompanyListPage = ({
  onSelectCompany,
  user,
  allPromotions,
  onClaimOffer,
}: CompanyListPageProps) => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"All Businesses" | "Top Ranked">(
    "All Businesses"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [currentPopupPromotion, setCurrentPopupPromotion] =
    useState<Promotion | null>(null);
  const [usedPromotions, setUsedPromotions] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ Add login modal state

  // ✅ Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/categories`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Extract category names from the response
        const categoryNames = data.map((cat: any) => cat.name);
        setCategories(["All", ...categoryNames]);
      } else if (data.success && Array.isArray(data.categories)) {
        const categoryNames = data.categories.map((cat: any) => cat.name);
        setCategories(["All", ...categoryNames]);
      } else {
        // Fallback to default categories if API fails
        setCategories(["All", "Ecommerce", "LMS", "Technology", "Food", "Fashion"]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Fallback to default categories
      setCategories(["All", "Ecommerce", "LMS", "Technology", "Food", "Fashion"]);
    }
  };

  // ✅ Fetch subcategories based on selected category
  const fetchSubcategories = async (category: string) => {
    if (category === "All") {
      setSubcategories(["All"]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/categories`);
      const data = await response.json();
      
      let categoriesData: any[] = [];
      if (Array.isArray(data)) {
        categoriesData = data;
      } else if (data.success && Array.isArray(data.categories)) {
        categoriesData = data.categories;
      }

      // Find the selected category and get its subcategories
      const selectedCat = categoriesData.find((cat: any) => cat.name === category);
      
      if (selectedCat && Array.isArray(selectedCat.subcategories)) {
        const subcategoryNames = selectedCat.subcategories.map((sub: any) => sub.name);
        setSubcategories(["All", ...subcategoryNames]);
      } else {
        // If no subcategories found, use default ones
        setSubcategories(["All", "General"]);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubcategories(["All", "General"]);
    }
  };

  // ✅ Filter active promotions based on displayType
  const bannerPromotions = allPromotions.filter((promo) => {
    const isActive = promo.isActive && new Date(promo.endDate) > new Date();
    const isBanner = promo.displayType === "banner" || promo.type === "banner";
    return isActive && isBanner;
  });

  const popupPromotions = allPromotions.filter((promo) => {
    const isActive = promo.isActive && new Date(promo.endDate) > new Date();
    const isPopup = promo.displayType === "popup" || promo.type === "popup";
    return isActive && isPopup && !usedPromotions.includes(promo._id!);
  });

  // ✅ Show popup promotion on mount
  useEffect(() => {
    if (popupPromotions.length > 0 && !showPromotionPopup) {
      const availablePopup = popupPromotions[0];
      setTimeout(() => {
        setCurrentPopupPromotion(availablePopup);
        setShowPromotionPopup(true);
        setUsedPromotions((prev) => [...prev, availablePopup._id!]);
      }, 2000);
    }
  }, [popupPromotions.length, showPromotionPopup]);

  // ✅ Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch subcategories when category changes
  useEffect(() => {
    fetchSubcategories(selectedCategory);
  }, [selectedCategory]);

  // ✅ Fetch all businesses once (no category filter)
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/business/all`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const companiesWithStats = await Promise.all(
            data.map(async (item, index) => {
              try {
                const postsResponse = await fetch(
                  `${API_BASE_URL}/api/post/${item._id}`
                );
                const postsData = await postsResponse.json();
                const posts = postsData.posts || [];

                const productsResponse = await fetch(
                  `${API_BASE_URL}/api/product/${item._id}`
                );
                const productsData = await productsResponse.json();
                const products = productsData.products || [];

                const totalLikes = posts.reduce(
                  (sum: number, post: Post) => sum + (post.likes || 0),
                  0
                );
                const totalComments = posts.reduce(
                  (sum: number, post: Post) => sum + (post.comments || 0),
                  0
                );
                const totalInteractions = totalLikes + totalComments;
                const followerCount = parseInt(item.followers) || 1000;

                const engagementRate =
                  followerCount > 0
                    ? parseFloat(
                        ((totalInteractions / followerCount) * 100).toFixed(1)
                      )
                    : 0.0;

                return {
                  _id: item._id,
                  rank: index + 1,
                  name: item.businessName || "Unnamed Business",
                  description:
                    item.businessDescription || "No description available",
                  followers:
                    item.followers ||
                    Math.floor(Math.random() * 5000).toString(),
                  trend: "Rising",
                  siteUrl: item.businessWebsite || "#",
                  logoUrl:
                    item.logoUrl || "https://placehold.co/100x100?text=No+Logo",
                  posts,
                  products,
                  totalPosts: posts.length,
                  totalProducts: products.length,
                  engagementRate,
                  category: item.businessCategory || "Ecommerce",
                  subcategory: item.subcategory || "General",
                } as Company;
              } catch {
                return {
                  _id: item._id,
                  rank: index + 1,
                  name: item.businessName || "Unnamed Business",
                  description:
                    item.businessDescription || "No description available",
                  followers:
                    item.followers ||
                    Math.floor(Math.random() * 5000).toString(),
                  trend: "Rising",
                  siteUrl: item.businessWebsite || "#",
                  logoUrl: item.logoUrl,
                  posts: [],
                  products: [],
                  engagementRate: 0.0,
                  category: item.businessCategory || "Ecommerce",
                  subcategory: item.subcategory || "General",
                } as Company;
              }
            })
          );

          companiesWithStats.sort(
            (a, b) =>
              (b.engagementRate as number) - (a.engagementRate as number)
          );
          companiesWithStats.forEach((c, index) => (c.rank = index + 1));

          setAllCompanies(companiesWithStats);
        }
      } catch (err) {
        console.error("Error fetching businesses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

  // ✅ Local filtering
  const filteredCompanies = React.useMemo(() => {
    let list = [...allCompanies];

    if (selectedCategory !== "All") {
      list = list.filter((c) => c.category === selectedCategory);
    }

    if (selectedSubcategory !== "All") {
      list = list.filter((c) => c.subcategory === selectedSubcategory);
    }

    if (activeTab === "Top Ranked") {
      return list.sort(
        (a, b) => (b.engagementRate as number) - (a.engagementRate as number)
      );
    } else {
      return shuffleArray(list);
    }
  }, [allCompanies, selectedCategory, selectedSubcategory, activeTab]);

  // ✅ Insert banner after every 3 companies
  const zigzagContent = React.useMemo(() => {
    const content: Array<Company | Promotion> = [];
    let bannerIndex = 0;

    filteredCompanies.forEach((company, index) => {
      content.push(company);
      if ((index + 1) % 3 === 0 && bannerPromotions.length > 0) {
        const bannerPromotion =
          bannerPromotions[bannerIndex % bannerPromotions.length];
        content.push(bannerPromotion);
        bannerIndex++;
      }
    });

    return content;
  }, [filteredCompanies, bannerPromotions]);

  const handleClosePopup = () => {
    setShowPromotionPopup(false);
    setCurrentPopupPromotion(null);
  };

  const handleClaimOfferFromPopup = () => {
    if (currentPopupPromotion) {
      onClaimOffer(currentPopupPromotion);
      handleClosePopup();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubcategory("All"); // Reset subcategory when category changes
  };

  // ✅ Handle login request
  const handleLoginRequest = () => {
    setShowLoginModal(true);
  };

  // ✅ Handle successful login
  const handleLoginSuccess = (userData: User) => {
    setShowLoginModal(false);
    // You might want to refresh follow status after login
    // The follow status will automatically update when user data changes
  };

  if (loading)
    return (
      <div className="app-center">
        <p className="text-default">Loading companies...</p>
      </div>
    );

  return (
    <>
      <main className="company-list-container">
        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "All Businesses" ? "active" : ""}`}
              onClick={() => setActiveTab("All Businesses")}
            >
              All Businesses
            </button>
            <button
              className={`tab ${activeTab === "Top Ranked" ? "active" : ""}`}
              onClick={() => setActiveTab("Top Ranked")}
            >
              Top Ranked
            </button>
          </div>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="category-select" className="filter-label">
              Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory dropdown */}
          {subcategories.length > 1 && (
            <div className="filter-group">
              <label htmlFor="subcategory-select" className="filter-label">
                Subcategory:
              </label>
              <select
                id="subcategory-select"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="filter-select"
              >
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Company List + Banners */}
        <div className="company-cards-grid">
          {zigzagContent.length > 0 ? (
            zigzagContent.map((item, index) => {
              if ("rank" in item) {
                return (
                  <div key={`company-${item._id}-${index}`} className="company-card-wrapper">
                    <CompanyListItem
                      company={{
                        ...item,
                        engagementRate: (item.engagementRate as number).toFixed(1),
                      }}
                      onSelectCompany={onSelectCompany}
                      user={user}
                      onLoginClick={handleLoginRequest} // ✅ Pass login handler
                    />
                  </div>
                );
              } else {
                return (
                  <div key={`banner-${item._id}-${index}`} className="banner-card-wrapper">
                    <PromotionBanner
                      promotion={item as Promotion}
                      onClaimOffer={onClaimOffer}
                    />
                  </div>
                );
              }
            })
          ) : (
            <div className="no-companies-message">
              No businesses found for selected filters.
            </div>
          )}
        </div>

        {/* Popup Promotion */}
        {showPromotionPopup && currentPopupPromotion && (
          <PromotionPopup
            promotion={currentPopupPromotion}
            onClose={handleClosePopup}
            onClaimOffer={handleClaimOfferFromPopup}
          />
        )}
      </main>

      {/* ✅ Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
        onOpenRegister={() => {
          // If you have a register modal, handle it here
          setShowLoginModal(false);
          // You can add your register modal opening logic here
        }}
      />
    </>
  );
};

const comstyles = `
.company-list-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: #000000;
  min-height: 100vh;
  color: #ffffff;
}

/* Tabs */
.tabs-container {
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  background: #000000;
}

.tabs {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
}

.tab {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #a8a8a8;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab.active {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.tab:hover {
  color: #ffffff;
  background: #121212;
}

.filters-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #000000;
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
  position: relative;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.filter-select {
  background: #1a1a1a;
  border: 1px solid #363636;
  border-radius: 6px;
  padding: 10px 12px;
  color: #ffffff;
  font-size: 14px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #00ff99;
}

.company-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.company-card-wrapper {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.company-card-wrapper:hover {
  transform: translateY(-2px);
  border-color: #555555;
}

.banner-card-wrapper {
  grid-column: 1 / -1;
  margin: 10px 0;
}

.no-companies-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #a8a8a8;
  background: #000000;
  font-size: 16px;
}

.app-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.text-default {
  color: #ffffff;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .company-list-container {
    padding: 10px;
  }

  .tabs {
    flex-direction: row;
  }

  .tab {
    padding: 12px;
    text-align: center;
  }

  .filters-container {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .company-cards-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0;
  }

  .banner-card-wrapper {
    grid-column: 1;
    margin: 5px 0;
  }

  .company-card-wrapper:hover {
    transform: none;
    border-color: #363636;
  }
}

/* Tablet Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .company-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .banner-card-wrapper {
    grid-column: 1 / -1;
  }
}

/* Ensure the banner appears after every 3 companies */
.company-cards-grid > .company-card-wrapper:nth-child(3n) {
  /* This ensures proper wrapping */
}

/* Global body background */
body {
  background: #000000 !important;
  color: #ffffff !important;
}

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #363636;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
`;

// Add this style to your document
const comstylesElement = document.createElement("style");
comstylesElement.innerText = comstyles;
document.head.appendChild(comstylesElement);

// ---------------- MOBILE MENU ----------------
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onNavClick: (page: string) => void;
  user?: User;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  onProfileClick: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  activePage,
  onNavClick,
  user,
  onLogin,
  onRegister,
  onLogout,
  onProfileClick,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  const handleNavClick = (page: string) => {
    onNavClick(page);
    onClose();
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    onClose();
  };

  const handleProfileClick = () => {
    onProfileClick();
    onClose();
  };

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
           <div className="header-logo" aria-label="Zetova logo">
        <img src={logoUrl} alt="Logo" className="logo-image" />
      </div>
          <button onClick={onClose} className="mobile-menu-close">
            <span className="material-icons">close</span>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <a
            href="#"
            className={`mobile-menu-item ${
              activePage === "Home" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home");
            }}
          >
            <span className="material-icons">home</span>
            <span>Home</span>
          </a>
          <a
            href="#"
            className={`mobile-menu-item ${
              activePage === "About" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("About");
            }}
          >
            <span className="material-icons">info</span>
            <span>About Us</span>
          </a>
          <a
            href="#"
            className={`mobile-menu-item ${
              activePage === "Posts" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Posts");
            }}
          >
            <span className="material-icons">article</span>
            <span>All Posts</span>
          </a>
          {user?.isLoggedIn && (
            <a
              href="#"
              className={`mobile-menu-item ${
                activePage === "Profile" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleProfileClick();
              }}
            >
              <span className="material-icons">account_circle</span>
              <span>My Profile</span>
            </a>
          )}
        </nav>

        <div className="mobile-menu-auth">
          {user?.isLoggedIn ? (
            <div className="mobile-menu-user">
              <span className="user-greeting">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-menu-auth-buttons">
              <button onClick={onLogin} className="btn btn-outline">
                Login
              </button>
              <button onClick={onRegister} className="btn btn-solid">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------- BANNER COMPONENT ----------------
const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2 className="banner-title">Discover Top Companies</h2>
      </div>
      <div className="banner-image">
        <span className="material-icons">trending_up</span>
      </div>
    </section>
  );
};



interface AllPostsPageProps {
  onSelectPost: (post: Post) => void;
  user?: User;
  onLoginRequest?: () => void; // Add this prop for login navigation
}

const AllPostsPage = ({ onSelectPost, user, onLoginRequest }: AllPostsPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"Following" | "Unfollowing">("Following");
  const [showLoginModal, setShowLoginModal] = useState(false); // Add state for login modal

  const fetchPosts = useCallback(async () => {
    if (!user?._id) {
      setLoading(false);
      setPosts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError("");

      const endpoint =
        activeTab === "Following"
          ? `http://localhost:5000/api/posts/following/${user._id}`
          : `http://localhost:5000/api/posts/unfollowed/${user._id}`;

      const response = await axios.get(endpoint);
      const data = response.data;

      if (data.success && Array.isArray(data.posts)) {
        const processed = await Promise.all(
          data.posts.map(async (post: any, i: number) => {
            let imageUrl =
              post.media?.[0]?.url ||
              post.mediaUrl ||
              post.imageUrl ||
              `https://picsum.photos/600/400?random=${i}`;

            if (!imageUrl.startsWith("http")) {
              imageUrl = `http://localhost:5000${
                imageUrl.startsWith("/") ? "" : "/"
              }${imageUrl}`;
            }

            // Fetch complete company details for each post
            let company = null;
            const companyId = post.business?._id || post.business;
            
            if (companyId) {
              try {
                const companyResponse = await axios.get(
                  `http://localhost:5000/api/companies/${companyId}`
                );
                if (companyResponse.data.success) {
                  company = companyResponse.data.company;
                  
                  // Process company logo URL
                  if (company.logoUrl) {
                    let logoUrl = company.logoUrl;
                    if (!logoUrl.startsWith("http")) {
                      logoUrl = `http://localhost:5000${
                        logoUrl.startsWith("/") ? "" : "/"
                      }${logoUrl}`;
                    }
                    company.logoUrl = logoUrl;
                  }
                  
                  // Generate username from businessName
                  if (company.businessName) {
                    company.username = company.businessName.toLowerCase().replace(/[\s.]/g, "_");
                    company.name = company.businessName;
                  }
                }
              } catch (err) {
                console.error("Error fetching company:", err);
                company = {
                  _id: companyId,
                  businessName: "Unknown Business",
                  name: "Unknown Business",
                  username: "unknown_business",
                  logoUrl: null
                };
              }
            }

            // Check like status for each post
            let isLiked = false;
            if (user?._id && post._id) {
              try {
                const likeResponse = await axios.get(
                  `http://localhost:5000/api/post/${post._id}/like-status/${user._id}`
                );
                isLiked = likeResponse.data.isLiked;
              } catch (err) {
                console.error("Error checking like status:", err);
              }
            }

            return {
              ...post,
              _id: post._id || `post-${i}`,
              imageUrl,
              company: company || {
                _id: companyId,
                businessName: "Unknown Business",
                name: "Unknown Business",
                username: "unknown_business",
                logoUrl: null
              },
              likes: post.likesCount || post.likes || 0,
              comments: post.commentsCount || post.comments || 0,
              isLiked: isLiked
            };
          })
        );
        setPosts(processed);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [user?._id, activeTab]);

  // Handle login request - open modal
  const handleLoginRequest = () => {
    setShowLoginModal(true);
  };

  // Handle successful login
  const handleLoginSuccess = (userData: User) => {
    setShowLoginModal(false);
    // You might want to refresh posts after login
    if (userData._id) {
      fetchPosts();
    }
  };

  const handleLike = async (postId: string, postIndex: number) => {
    if (!user?._id) {
      return; // Will be handled in PostGridItem with login prompt
    }

    try {
      const updatedPosts = [...posts];
      const post = updatedPosts[postIndex];
      const newLikeStatus = !post.isLiked;
      const newLikesCount = newLikeStatus ? post.likes + 1 : post.likes - 1;

      // Optimistic update
      updatedPosts[postIndex] = {
        ...post,
        isLiked: newLikeStatus,
        likes: newLikesCount
      };
      setPosts(updatedPosts);

      await axios.post(`http://localhost:5000/api/post/${postId}/like`, {
        userId: user._id,
      });

    } catch (err: any) {
      // Revert on error
      const revertedPosts = [...posts];
      revertedPosts[postIndex] = {
        ...revertedPosts[postIndex],
        isLiked: !revertedPosts[postIndex].isLiked,
        likes: revertedPosts[postIndex].isLiked 
          ? revertedPosts[postIndex].likes - 1 
          : revertedPosts[postIndex].likes + 1
      };
      setPosts(revertedPosts);
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId: string, postIndex: number, commentText: string) => {
    if (!user?._id) {
      return { success: false, error: "Please login to comment" };
    }

    if (!commentText.trim()) return { success: false, error: "Comment cannot be empty" };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${postId}/comment`,
        {
          text: commentText,
          userId: user._id,
        }
      );

      // Update comment count
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        comments: response.data.commentsCount
      };
      setPosts(updatedPosts);

      return { success: true };
    } catch (err: any) {
      console.error("Error commenting:", err);
      return { success: false, error: err.message };
    }
  };

  const handleShare = async (post: Post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post',
          text: post.content || 'Interesting post',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, activeTab]);

  // Show login prompt when user is not logged in
  if (!user?._id) {
    return (
      <>
        <div className="app-center login-prompt">
          <div className="login-prompt-content">
            <h2>Join the Community</h2>
            <p>Login to see posts from businesses you follow and discover new ones!</p>
            <button 
              onClick={handleLoginRequest} 
              className="login-btn-primary"
            >
              Login to Continue
            </button>
            <div className="login-features">
              <div className="feature">
                <span className="material-icons">favorite</span>
                <span>Like and save your favorite posts</span>
              </div>
              <div className="feature">
                <span className="material-icons">chat</span>
                <span>Join conversations with comments</span>
              </div>
              <div className="feature">
                <span className="material-icons">business</span>
                <span>Discover new businesses to follow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
          onOpenRegister={() => {
            // If you have a register modal, handle it here
            setShowLoginModal(false);
            // You can add your register modal opening logic here
          }}
        />
      </>
    );
  }

  if (loading)
    return (
      <div className="app-center">
        <p className="text-default">
          Loading {activeTab.toLowerCase()} posts...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="app-center app-error">
        <p>⚠️ {error}</p>
        <button onClick={fetchPosts} className="retry-btn">
          Retry
        </button>
      </div>
    );

  return (
    <>
      <main className="all-posts-page">
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "Following" ? "active" : ""}`}
              onClick={() => setActiveTab("Following")}
            >
              Following
            </button>
            <button
              className={`tab ${activeTab === "Unfollowing" ? "active" : ""}`}
              onClick={() => setActiveTab("Unfollowing")}
            >
              Unfollowing
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts">No {activeTab.toLowerCase()} posts found</div>
        ) : (
          <div className="posts-feed">
            {posts.map((post, index) => (
              <PostGridItem
                key={post._id}
                post={post}
                postIndex={index}
                onSelectPost={onSelectPost}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                user={user}
                onLoginRequest={handleLoginRequest}
              />
            ))}
          </div>
        )}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
        onOpenRegister={() => {
          // If you have a register modal, handle it here
          setShowLoginModal(false);
          // You can add your register modal opening logic here
        }}
      />
    </>
  );
};

interface PostGridItemProps {
  post: Post;
  postIndex: number;
  onSelectPost: (post: Post) => void;
  onLike: (postId: string, postIndex: number) => void;
  onComment: (postId: string, postIndex: number, commentText: string) => Promise<{success: boolean; error?: string}>;
  onShare: (post: Post) => void;
  user?: User;
  onLoginRequest?: () => void;
}

const PostGridItem = ({ 
  post, 
  postIndex, 
  onSelectPost, 
  onLike, 
  onComment,
  onShare, 
  user,
  onLoginRequest
}: PostGridItemProps) => {
  const companyName = post.company?.businessName || post.company?.name || "Business Name";
  const companyUsername = post.company?.username || companyName.toLowerCase().replace(/[\s.]/g, "_");

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [actionError, setActionError] = useState("");

  const formattedDate = new Date(
    post.createdAt || post.date
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const toggleComments = async () => {
    if (!user?._id) {
      setActionError("Please login to view comments");
      return;
    }

    if (!showComments && post._id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/${post._id}/comments`
        );
        setPostComments(response.data.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    }
    setShowComments(!showComments);
    setActionError("");
  };

  const handleLikeWithLoginCheck = () => {
    if (!user?._id) {
      setActionError("Please login to like posts");
      return;
    }
    setActionError("");
    onLike(post._id, postIndex);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !post._id) return;

    setIsSubmittingComment(true);
    setActionError("");
    try {
      const result = await onComment(post._id, postIndex, commentText);
      if (result.success) {
        setCommentText("");
        // Refresh comments
        const response = await axios.get(
          `http://localhost:5000/api/post/${post._id}/comments`
        );
        setPostComments(response.data.comments || []);
      } else if (result.error) {
        setActionError(result.error);
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setActionError("Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShareWithLoginCheck = () => {
    onShare(post);
  };

  return (
    <article className="post-grid-item">
      {/* Header with Business Info and Logo */}
      <div className="post-header">
        <div className="business-info">
          <div className="business-avatar">
            {post.company?.logoUrl ? (
              <img 
                src={post.company.logoUrl} 
                alt={companyName}
                className="business-logo"
              />
            ) : (
              companyName.charAt(0)
            )}
          </div>
          <div className="business-details">
            <strong className="business-name">
              {companyName}
            </strong>
            <span className="business-username">@{companyUsername}</span>
          </div>
        </div>
      </div>

      {/* Post Image */}
      <div 
        className="post-image-container"
        onClick={() => onSelectPost(post)}
      >
        <img
          src={post.imageUrl}
          alt={post.content || "Post image"}
          className="post-image"
        />
      </div>

      {/* Action Error Message */}
      {actionError && (
        <div className="action-error">
          <span>{actionError}</span>
          {onLoginRequest && (
            <button 
              onClick={onLoginRequest}
              className="login-link-btn"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Engagement Section */}
      <div className="post-engagement">
        <div className="engagement-left">
          <button
            className={`like-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={handleLikeWithLoginCheck}
          >
            <span className="material-icons">
              {post.isLiked ? "favorite" : "favorite_border"}
            </span>
          </button>
          <button 
            className="comment-btn"
            onClick={toggleComments}
          >
            <span className="material-icons">chat_bubble_outline</span>
          </button>
          <button 
            className="share-btn"
            onClick={handleShareWithLoginCheck}
          >
            <span className="material-icons">send</span>
          </button>
        </div>
      </div>

      {/* Post Stats and Content */}
      <div className="post-content">
        {post.likes > 0 && (
          <div className="post-stats">
            <strong>{post.likes.toLocaleString()} likes</strong>
          </div>
        )}

        <div className="post-caption">
          <strong className="username">@{companyUsername}</strong> 
          <span className="caption-text">{post.content || post.caption}</span>
        </div>

        {post.comments > 0 && (
          <button 
            className="view-comments"
            onClick={toggleComments}
          >
            View all {post.comments} comments
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="comments-section">
            {!user?._id ? (
              <div className="login-prompt-comments">
                <p>Please login to view and post comments</p>
                {onLoginRequest && (
                  <button 
                    onClick={onLoginRequest}
                    className="login-btn-small"
                  >
                    Login
                  </button>
                )}
              </div>
            ) : (
              <>
                {postComments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <strong className="comment-username">
                      {comment.userId?.name || 'User'}
                    </strong>
                    <span className="comment-text">{comment.text}</span>
                  </div>
                ))}
                
                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="comment-input"
                    disabled={isSubmittingComment || !user?._id}
                  />
                  <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={!commentText.trim() || isSubmittingComment || !user?._id}
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post'}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        <div className="post-date">{formattedDate}</div>
      </div>
    </article>
  );
};
const styles = `
/* Login Prompt Styles */
.login-prompt {
  text-align: center;
  padding: 2rem;
}

.login-prompt-content h2 {
  margin-bottom: 1rem;
  color: #333;
}

.login-prompt-content p {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.login-btn-primary {
  background: #0095f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
}

.login-btn-primary:hover {
  background: #0081d6;
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.feature .material-icons {
  color: #0095f6;
}

/* Action Error Styles */
.action-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.login-link-btn {
  background: none;
  border: 1px solid #856404;
  color: #856404;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.login-link-btn:hover {
  background: #856404;
  color: white;
}

/* Comments Login Prompt */
.login-prompt-comments {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.login-btn-small {
  background: #0095f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.login-btn-small:hover {
  background: #0081d6;
}
.all-posts-page {
  max-width: 614px;
  margin: 0 auto;
  padding: 20px 0;
  background: #000000;
  min-height: 100vh;
}

.posts-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-grid-item {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  overflow: hidden;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #000000;
}

.business-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.business-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.business-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.business-details {
  display: flex;
  flex-direction: column;
}

.business-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.business-username {
  font-size: 12px;
  color: #a8a8a8;
}

.post-image-container {
  cursor: pointer;
  background: #000000;
}

.post-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.post-engagement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #000000;
}

.engagement-left {
  display: flex;
  gap: 16px;
}

.like-btn, .comment-btn, .share-btn, .bookmark-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #ffffff;
}

.like-btn.liked .material-icons {
  color: #ed4956;
}

.material-icons {
  font-size: 24px;
  color: #ffffff;
  transition: transform 0.2s ease;
}

.material-icons:hover {
  transform: scale(1.1);
}

.post-content {
  padding: 0 16px 16px;
  background: #000000;
}

.post-stats {
  margin-bottom: 8px;
}

.post-stats strong {
  font-size: 14px;
  color: #ffffff;
}

.post-caption {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
  color: #ffffff;
}

.username {
  color: #ffffff;
  font-weight: 600;
  margin-right: 6px;
}

.caption-text {
  color: #ffffff;
}

.view-comments {
  background: none;
  border: none;
  color: #a8a8a8;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.view-comments:hover {
  color: #ffffff;
}

/* Comments Section */
.comments-section {
  margin: 12px 0;
  border-top: 1px solid #363636;
  padding-top: 12px;
}

.comment-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.comment-username {
  color: #ffffff;
  font-weight: 600;
}

.comment-text {
  color: #ffffff;
}

.comment-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.comment-input {
  flex: 1;
  background: #000000;
  border: 1px solid #363636;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
}

.comment-input::placeholder {
  color: #a8a8a8;
}

.comment-input:focus {
  outline: none;
  border-color: #0095f6;
}

.comment-submit-btn {
  background: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.comment-submit-btn:disabled {
  background: #363636;
  color: #a8a8a8;
  cursor: not-allowed;
}

.comment-submit-btn:not(:disabled):hover {
  opacity: 0.8;
}

.post-date {
  font-size: 10px;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 8px;
}

/* Tabs */
.tabs-container {
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  background: #000000;
}

.tabs {
  display: flex;
  max-width: 614px;
  margin: 0 auto;
  background: #000000;
}

.tab {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #a8a8a8;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  background: #000000;
}

.tab.active {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.tab:hover {
  color: #ffffff;
  background: #121212;
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #a8a8a8;
  background: #000000;
}

.app-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: #000000;
}

.text-default {
  color: #ffffff;
}

.app-error {
  flex-direction: column;
  gap: 12px;
  background: #000000;
}

.app-error p {
  color: #ffffff;
}

.retry-btn {
  padding: 8px 16px;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

/* Global body background */
body {
  background: #000000 !important;
  color: #ffffff !important;
}

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #363636;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
`;

// Add this style to your document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
// ---------------- POST DETAIL PAGE ----------------
interface PostDetailPageProps {
  data: { post: Post; company: Company };
  onBack: () => void;
  user?: User;
  onLoginRequest?: () => void;
}

const PostDetailPage = ({ data, onBack, user, onLoginRequest }: PostDetailPageProps) => {
  const [post, setPost] = useState<Post>(data.post);
  const [company, setCompany] = useState<Company>(data.company);
  const [loading, setLoading] = useState(!data.post._id);

  useEffect(() => {
    // If post data is incomplete, fetch it
    if (!data.post._id && data.post._id) {
      fetchPostDetails(data.post._id);
    }
  }, [data.post._id]);

  const fetchPostDetails = async (postId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/post/${postId}`);
      if (response.data.success) {
        setPost(response.data.post);
        
        // If company data is incomplete, fetch it too
        if (!data.company._id && response.data.post.businessId) {
          const companyResponse = await axios.get(`${API_BASE_URL}/api/companies/${response.data.post.businessId}`);
          if (companyResponse.data.success) {
            setCompany(companyResponse.data.company);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching post details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <header className="post-detail-header">
          <button onClick={onBack} className="back-button">
            <span className="material-icons">arrow_back</span>
          </button>
          <h2>Post</h2>
        </header>
        <div className="loading-container">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <header className="post-detail-header">
        <button onClick={onBack} className="back-button">
          <span className="material-icons">arrow_back</span>
        </button>
        <h2>Post</h2>
      </header>
      <main className="post-detail-content">
        <PostItem 
          post={post} 
          company={company} 
          user={user} 
          onLoginRequest={onLoginRequest}
        />
      </main>
    </div>
  );
};
// ---------------- PROFILE PAGE ----------------
interface ProfilePageProps {
  company: Company;
  onSelectPost: (post: Post, company: Company) => void;
  user?: User;
  onLoginRequest?: () => void;
}


const ProfilePage = ({ company, onSelectPost, user, onLoginRequest }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Products">("Posts");
  const [activePostCategory, setActivePostCategory] = useState("All");
  const [activeProductTag, setActiveProductTag] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followers, setFollowers] = useState<number>(
    parseInt(company.followers) || 0
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showPostsGrid, setShowPostsGrid] = useState(false);
  
  // State for dynamic post categories
  const [postCategories, setPostCategories] = useState<string[]>(["All"]);

  // --- Omitted: checkFollowStatus useEffect (no changes) ---
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user?._id && company._id) {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/follow/${company._id}/status/${user._id}`
          );
          setIsFollowing(res.data.isFollowing);
        } catch (err) {
          console.error("Error checking follow status:", err);
        }
      }
    };
    checkFollowStatus();
  }, [user?._id, company._id]);


  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [postsRes, productsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/post/${company._id}`),
          fetch(`${API_BASE_URL}/api/product/${company._id}`),
        ]);

        if (!postsRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const postsData = await postsRes.json();
        const productsData = await productsRes.json();

        const fetchedPosts = postsData.posts || [];
        
        // 1. Process posts
        const processedPosts = fetchedPosts.map((post: Post) => ({
          ...post,
          _id: post._id || `post-${Math.random()}`,
          imageUrl: post.mediaUrl || post.imageUrl || `https://picsum.photos/600/400?random=${post._id}`,
          mediaUrl: post.mediaUrl || post.imageUrl,
          likes: post.likes || 0,
          comments: post.comments || 0,
          company: {
            _id: company._id,
            name: company.name,
            username: company.name.toLowerCase().replace(/[\s.]/g, "_"),
            logoUrl: company.logoUrl,
            businessName: company.name
          }
        }));

        setPosts(processedPosts);
        setProducts(productsData.products || []);
        setError("");
        
        // 2. Extract unique categories from fetched posts
        const uniqueCategories = [
          "All", 
          ...new Set(processedPosts.map((p: Post) => p.category).filter((c: string) => c))
        ];
        
        // Set dynamic categories
        setPostCategories(uniqueCategories);

      } catch (err) {
        console.error(err);
        setError("Error fetching company content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [company._id]);
  // --- Omitted: handleFollow, handlePostImageClick, handleClosePostDetail, handleShowPostsGrid, handleHidePostsGrid, handleLike, handleComment, handleShare (no changes) ---
  
  const handleFollow = async () => {
    if (!user?._id) {
    // Open login page if not logged in
    if (onLoginRequest) {
      onLoginRequest();
    }
    return;
  }
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/follow/${company._id}`,
        {
          userId: user._id,
        }
      );
      if (res.data.success) {
        setFollowers(res.data.followers);
        setIsFollowing(res.data.isFollowing);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handlePostImageClick = (post: Post) => {
    console.log("Post image clicked:", post._id);
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  const handleShowPostsGrid = () => {
    setShowPostsGrid(true);
  };

  const handleHidePostsGrid = () => {
    setShowPostsGrid(false);
  };

  // Post engagement handlers
  const handleLike = async (postId: string, postIndex: number) => {
    if (!user?._id) {
      return;
    }

    try {
      const updatedPosts = [...posts];
      const post = updatedPosts[postIndex];
      const newLikeStatus = !post.isLiked;
      const newLikesCount = newLikeStatus ? post.likes + 1 : post.likes - 1;

      // Optimistic update
      updatedPosts[postIndex] = {
        ...post,
        isLiked: newLikeStatus,
        likes: newLikesCount
      };
      setPosts(updatedPosts);

      await axios.post(`http://localhost:5000/api/post/${postId}/like`, {
        userId: user._id,
      });

    } catch (err: any) {
      // Revert on error
      const revertedPosts = [...posts];
      revertedPosts[postIndex] = {
        ...revertedPosts[postIndex],
        isLiked: !revertedPosts[postIndex].isLiked,
        likes: revertedPosts[postIndex].isLiked 
          ? revertedPosts[postIndex].likes - 1 
          : revertedPosts[postIndex].likes + 1
      };
      setPosts(revertedPosts);
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId: string, postIndex: number, commentText: string) => {
    if (!user?._id) {
      return { success: false, error: "Please login to comment" };
    }

    if (!commentText.trim()) return { success: false, error: "Comment cannot be empty" };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/post/${postId}/comment`,
        {
          text: commentText,
          userId: user._id,
        }
      );

      // Update comment count
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        comments: response.data.commentsCount
      };
      setPosts(updatedPosts);

      return { success: true };
    } catch (err: any) {
      console.error("Error commenting:", err);
      return { success: false, error: err.message };
    }
  };

  const handleShare = async (post: Post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post',
          text: post.content || 'Interesting post',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };


  // Filtering logic for posts
  const filteredPosts =
    activePostCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activePostCategory);

  // Filtering logic for products (no changes)
  const filteredProducts =
    activeProductTag === "All"
      ? products
      : products.filter((p) =>
          p.tags
            ?.map((t) => t.toLowerCase())
            .includes(activeProductTag.toLowerCase())
        );

  const productTags = ["All", "Offer", "Giveaway"];


  return (
    <div className="profile-page">
      <main className="profile-content">
        <section className="profile-header">
          <img
            src={`${company.logoUrl}`}
            alt={company.name}
            className="profile-logo"
          />
          <div className="profile-header-content">
            <h2 className="profile-name">{company.name}</h2>
            <p className="profile-description">
              {company.description || "No description available."}
            </p>
            <div className="profile-stats-grid">
              <div className="stat-item">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{products.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{followers}</span>
                <span className="stat-label">Followers</span>
              </div>
            {company.engagementRate > 0 && (
  <div className="stat-item">
    <span className="stat-number">{company.engagementRate}%</span>
    <span className="stat-label">Engagement</span>
  </div>
)}

            </div>
          </div>
          <div className="profile-header-actions">
            <a
              href={company.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Visit site
            </a>
              <button
    className={`btn btn-solid ${isFollowing ? "following" : ""}`}
    onClick={handleFollow}
  >
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
          </div>
        </section>
        <nav className="tabs profile-tabs" role="tablist">
          <button
            className={`tab ${activeTab === "Posts" ? "active" : ""}`}
            onClick={() => setActiveTab("Posts")}
          >
            Posts
          </button>
          <button
            className={`tab ${activeTab === "Products" ? "active" : ""}`}
            onClick={() => setActiveTab("Products")}
            data-tab="Products"
          >
            Products
          </button>
        </nav>

        {loading ? (
          <div className="loading-container">
            <p>Loading content...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {activeTab === "Posts" && (
              <>
                {/* Updated Post Categories Display */}
               <div className="post-tags">
     {postCategories.map((category) => (
       <button
         key={category}
         className={`tag-button ${activePostCategory === category ? "active" : ""}`}
         onClick={() => setActivePostCategory(category)}
       >
         {category}
       </button>
     ))}
   </div>
                {showPostDetail && selectedPost ? (
                  <div className="post-detail-overlay">
                    <div className="post-detail-container">
                      <button 
                        className="close-post-detail"
                        onClick={handleClosePostDetail}
                      >
                        <span className="material-icons">close</span>
                      </button>
                      <div className="post-detail-content">
                       <PostGridItem
 post={posts.find(p => p._id === selectedPost._id) || selectedPost}
 postIndex={posts.findIndex(p => p._id === selectedPost._id)}
 onSelectPost={handlePostImageClick}
 onLike={handleLike}
 onComment={handleComment}
 onShare={handleShare}
 user={user}
 onLoginRequest={onLoginRequest}
/>

                      </div>
                    </div>
                  </div>
                ) : showPostsGrid ? (
                  <div className="posts-grid-view">
                    <div className="posts-grid-header">
                      <button 
                        className="back-to-images-btn"
                        onClick={handleHidePostsGrid}
                      >
                        <span className="material-icons">arrow_back</span>
                        Back to Images
                      </button>
                      <h3>All Posts</h3>
                    </div>
                    <div className="posts-feed">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                          <PostGridItem
                            key={post._id}
                            post={post}
                            postIndex={index}
                            onSelectPost={handlePostImageClick}
                            onLike={handleLike}
                            onComment={handleComment}
                            onShare={handleShare}
                            user={user}
                            onLoginRequest={onLoginRequest}
                          />
                        ))
                      ) : (
                        <div className="no-posts">
                          <p>No posts yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="posts-images-view">
                    <div className="images-grid">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                          <div 
                            key={post._id} 
                            className="post-image-item"
                            onClick={() => handlePostImageClick(post)}
                          >
                            <img
                              src={post.imageUrl || post.mediaUrl}
                              alt={`Post by ${company.name}`}
                              className="post-image"
                              onError={(e) => {
                                e.currentTarget.src = `https://picsum.photos/400/400?random=${post._id}`;
                              }}
                            />
                            <div className="post-image-overlay">
                              <div className="post-stats">
                                <span className="stat">
                                  <span className="material-icons">favorite</span>
                                  {post.likes || 0}
                                </span>
                                <span className="stat">
                                  <span className="material-icons">chat_bubble</span>
                                  {post.comments || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-posts">
                          <p>No posts yet.</p>
                        </div>
                      )}
                    </div>
                    {filteredPosts.length > 0 && (
                      <div className="view-all-posts-btn-container">
                        <button 
                          className="view-all-posts-btn"
                          onClick={handleShowPostsGrid}
                        >
                          View All Posts
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === "Products" && (
              <>
                <div className="product-tags">
                  {productTags.map((tag) => (
                    <button
                      key={tag}
                      className={`tag-button ${
                        activeProductTag === tag ? "active" : ""
                      }`}
                      onClick={() => setActiveProductTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <section className="content-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product._id} className="grid-item product-item">
                        <a
                          href={product.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="product-link"
                        >
                          <img
                            src={`${product.image?.url || product.imageUrl}`}
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                              e.currentTarget.src = `https://picsum.photos/400/400?random=${product._id}`;
                            }}
                          />
                          <div className="product-info">
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">₹{product.price}</p>
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p className="text-center">No products yet.</p>
                    </div>
                  )}
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};
interface FooterProps {
  companyName?: string;
  logoUrl?: string;
}

const Footer = ({ companyName = "zooda" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 mt-10 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT - LOGO + NAME */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
             
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-12 h-12 object-cover rounded-lg"
                />
            

              <span className="text-xl font-semibold">{companyName}</span>
            </div>
          </div>

          {/* MIDDLE - LINKS */}
          <div className="flex flex-col text-center gap-2">
            <a href="/" className="hover:text-green-400 transition">Home</a>
            <a href="#about" className="hover:text-green-400 transition">About</a>
            <a href="#posts" className="hover:text-green-400 transition">Posts</a>
            <a href="#contact" className="hover:text-green-400 transition">Contact</a>
            <a href="#terms" className="hover:text-green-400 transition">Terms</a>
            <a href="#privacy" className="hover:text-green-400 transition">Privacy</a>
          </div>

          {/* RIGHT - CONTACT */}
          <div className="flex flex-col items-center md:items-end gap-2 text-gray-300">
            <p className="flex items-center gap-2">
              <span className="material-icons text-green-400">email</span>
              contact@{companyName.toLowerCase().replace(/\s+/g, "")}.com
            </p>

            <p className="flex items-center gap-2">
              <span className="material-icons text-green-400">phone</span>
              +1 (555) 123-4567
            </p>

            <p className="flex items-center gap-2">
              <span className="material-icons text-green-400">location_on</span>
              123 Business St, City, State
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <a
            href="https://client.zooda.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-black transition font-semibold"
          >
            Business Registration - client.zooda.in
          </a>

          <p className="text-gray-400 text-sm">
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onOpenRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin, onOpenRegister }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [forgotStep, setForgotStep] = useState<"email" | "reset" | null>(null);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setForgotStep(null);
      setForgotEmail("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const userData = response.data.user;
      const token = response.data.token;

      const userToStore = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userToStore));
      if (token) localStorage.setItem("authToken", token);

      onLogin(userToStore);
      setEmail("");
      setPassword("");
      setError("");
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/check-email`, { 
        email: forgotEmail 
      });
      
      if (res.data.exists) {
        setForgotStep("reset");
        setError("");
      } else {
        setError("Email not found. Please check your email address.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error checking email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email: forgotEmail,
        newPassword,
      });
      
      setError("");
      alert("Password updated successfully. Please login with your new password.");
      setForgotStep(null);
      setForgotEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setForgotStep(null);
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSwitchToRegister = () => {
    onClose();
    onOpenRegister();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            {forgotStep 
              ? (forgotStep === "email" ? "Forgot Password" : "Reset Password") 
              : "Login"
            }
          </h3>
          <button onClick={onClose} className="modal-close">
            <span className="material-icons">close</span>
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!forgotStep ? (
          // LOGIN FORM
          <>
            <form onSubmit={handleLoginSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-solid login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            
            <div className="modal-footer">
              <button
                type="button"
                className="footer-link"
                onClick={() => setForgotStep("email")}
                disabled={loading}
              >
                Forgot Password?
              </button>
              
              <div className="register-section">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  className="footer-link register-link"
                  onClick={handleSwitchToRegister}
                  disabled={loading}
                >
                  Register here
                </button>
              </div>
            </div>
          </>
        ) : forgotStep === "email" ? (
          // FORGOT PASSWORD - EMAIL STEP
          <>
            <form onSubmit={handleForgotEmailSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="forgot-email">Enter your email</label>
                <input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your registered email"
                />
              </div>
              
              <div className="forgot-password-buttons">
                <button 
                  type="submit" 
                  className="btn btn-solid"
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Next"}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        ) : (
          // FORGOT PASSWORD - RESET STEP
          <>
            <form onSubmit={handleResetPasswordSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter new password"
                  minLength={6}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Confirm new password"
                  minLength={6}
                />
              </div>
              
              <div className="forgot-password-buttons">
                <button 
                  type="submit" 
                  className="btn btn-solid"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ---------------- REGISTER MODAL ----------------
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (user: User) => void;
  onOpenLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onRegister, onOpenLogin }: RegisterModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setInterests([]);
      setError("");
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };
// ---------------- REGISTER MODAL (UPDATED handleSubmit) ----------------

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  if (interests.length === 0) {
    setError("Please select at least one interest");
    return;
  }

  setRegisterLoading(true);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      interests,
    });

    if (!response.data.success && response.data.message) {
      throw new Error(response.data.message);
    }

    const userData = response.data.user || response.data.data || response.data;

    // NOTE: We keep isLoggedIn: false here as registration doesn't guarantee a live session/token,
    // but the parent component may interpret the successful registration as an event to handle.
    const userToStore = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isLoggedIn: false, 
    };

    // Save registered user data (optional, used for potential pre-fill)
    localStorage.setItem("recentRegisteredUser", JSON.stringify(userToStore));

    // 1. Notify parent via callback (analogous to onLogin in LoginModal)
    onRegister(userToStore);

    // Clear form fields
    setName("");
    setEmail("");
    setPassword("");
    setInterests([]);
    setError("");

    // 2. Close modal (analogous to onClose in LoginModal)
    onClose();

    // ❌ REMOVED: setTimeout(() => onOpenLogin(), 300);
    // ❌ REMOVED: setTimeout(() => { window.location.href = "/?type=home"; }, 500);

  } catch (err: any) {
    setError(
      err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again."
    );
  } finally {
    setRegisterLoading(false);
  }
};
  const toggleInterest = (itemName: string) => {
    if (interests.includes(itemName)) {
      setInterests(interests.filter((i) => i !== itemName));
    } else {
      setInterests([...interests, itemName]);
    }
  };

  const handleSwitchToLogin = () => {
    onClose();
    onOpenLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content register-modal">
        <div className="modal-header">
          <h3>Create Account</h3>
          <button onClick={onClose} className="modal-close">
            <span className="material-icons">close</span>
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={registerLoading}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={registerLoading}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={registerLoading}
              placeholder="Enter password (min. 6 characters)"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Interests</label>
            
            {loading ? (
              <div className="loading-text">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="no-categories-text">No categories available</div>
            ) : (
              <div className="categories-section">
                {categories.map((category) => (
                  <div key={category._id} className="category-group">
                    <button
                      type="button"
                      className={`category-btn ${
                        interests.includes(category.name) ? "active" : ""
                      }`}
                      onClick={() => toggleInterest(category.name)}
                      disabled={registerLoading}
                    >
                      <span className="category-name">{category.name}</span>
                      {category.subcategories && category.subcategories.length > 0 && (
                        <span className="subcount-badge">
                          {category.subcategories.length} subcategories
                        </span>
                      )}
                    </button>

                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="subcategories-group">
                        {category.subcategories.map((subcategory: any) => (
                          <button
                            type="button"
                            key={subcategory._id}
                            className={`subcategory-btn ${
                              interests.includes(subcategory.name) ? "active" : ""
                            }`}
                            onClick={() => toggleInterest(subcategory.name)}
                            disabled={registerLoading}
                          >
                            {subcategory.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
           
          </div>

          <button 
            type="submit" 
            className="btn btn-solid register-btn"
            disabled={registerLoading || loading}
          >
            {registerLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
        
        <div className="modal-footer">
          <div className="login-section">
            <span>Already have an account? </span>
            <button
              type="button"
              className="footer-link login-link"
              onClick={handleSwitchToLogin}
              disabled={registerLoading}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- HASH ROUTER HOOK ----------------
// ---------------- HASH ROUTER HOOK ----------------
const useHashRouter = () => {
  const normalizeHash = (hash: string) => {
    if (!hash) return "";
    return hash.replace(/^#\/?|^!#\/?|^#!/, "");
  };

  const [currentHash, setCurrentHash] = useState<string>(normalizeHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(normalizeHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (hash: string) => {
    if (!hash.startsWith("#")) window.location.hash = `#${hash}`;
    else window.location.hash = hash;
  };

  const getRouteParams = () => {
    const hash = currentHash;

    if (hash.startsWith("company-")) return { type: "company", id: hash.replace("company-", "") };
    if (hash.startsWith("post-")) return { type: "post", id: hash.replace("post-", "") };

    switch (hash) {
      case "profile": return { type: "profile" };
      case "posts": return { type: "posts" };
      case "about": return { type: "about" };
      case "privacy": return { type: "privacy" };
      case "terms": return { type: "terms" };
      case "search": return { type: "search" };
      default: return { type: "home" };
    }
  };

  return {
    currentHash,
    navigate,
    routeParams: getRouteParams(),
  };
};

// ---------------- MAIN APP COMPONENT ----------------
const App = () => {
  const { currentHash, navigate, routeParams } = useHashRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allPromotions, setAllPromotions] = useState<Promotion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  
  // Add selectedPost state to store both post and company data
  const [selectedPost, setSelectedPost] = useState<{ post: Post; company: Company } | null>(null);

  // Route state derived from hash
  const isSearchActive = routeParams.type === 'search';
  const selectedCompanyId = routeParams.type === 'company' ? routeParams.id : null;
  const selectedPostId = routeParams.type === 'post' ? routeParams.id : null;
  
  const selectedCompany = allCompanies.find(c => c._id === selectedCompanyId) || null;

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []);

  // Load all promotions using the updated API
  useEffect(() => {
    const loadAllPromotions = async () => {
      try {
        const promotions = await getActivePromotions();
        setAllPromotions(promotions);
      } catch (err) {
        console.error("Error loading all promotions:", err);
      }
    };

    loadAllPromotions();
  }, []);

  // Reset selectedPost when navigating away from post
  useEffect(() => {
    if (routeParams.type !== 'post') {
      setSelectedPost(null);
    }
  }, [routeParams.type]);

  // Load post data when post hash changes
  useEffect(() => {
    const loadPostData = async () => {
      if (selectedPostId && !selectedPost) {
        try {
          console.log("Loading post data for:", selectedPostId);
          // Fetch post details
          const postResponse = await axios.get(`${API_BASE_URL}/api/post/${selectedPostId}`);
          if (postResponse.data.success) {
            const post = postResponse.data.post;
            console.log("Post data loaded:", post);
            
            // Fetch company details for the post
            let company: Company;
            if (post.businessId) {
              const companyResponse = await axios.get(`${API_BASE_URL}/api/companies/${post.businessId}`);
              company = companyResponse.data.company;
            } else {
              // Fallback company data
              company = {
                _id: 'unknown',
                rank: 0,
                name: 'Unknown Business',
                description: '',
                followers: '0',
                trend: '',
                siteUrl: '#',
                logoUrl: '',
                posts: [],
                postCategories: [],
                products: [],
                productCategories: [],
                engagementRate: '0.0'
              };
            }
            
            setSelectedPost({ post, company });
          }
        } catch (err) {
          console.error("Error loading post data:", err);
        }
      }
    };

    if (selectedPostId) {
      loadPostData();
    }
  }, [selectedPostId]);

  // Load all companies and products for search
  useEffect(() => {
    const loadSearchData = async () => {
      try {
        const companiesResponse = await fetch(
          `${API_BASE_URL}/api/business/all`
        );
        const companiesData = await companiesResponse.json();

        if (Array.isArray(companiesData)) {
          const companiesWithDetails = await Promise.all(
            companiesData.map(async (item, index) => {
              try {
                const productsResponse = await fetch(
                  `${API_BASE_URL}/api/product/${item._id}`
                );
                const productsData = await productsResponse.json();
                const products = productsData.products || [];

                const postsResponse = await fetch(
                  `${API_BASE_URL}/api/post/${item._id}`
                );
                const postsData = await postsResponse.json();
                const posts = postsData.posts || [];
                const totalLikes = posts.reduce(
                  (sum: number, post: Post) => sum + (post.likes || 0),
                  0
                );
                const totalComments = posts.reduce(
                  (sum: number, post: Post) => sum + (post.comments || 0),
                  0
                );
                const totalInteractions = totalLikes + totalComments;
                const followerCount = parseInt(item.followers) || 1000;
                const engagementRate =
                  followerCount > 0
                    ? ((totalInteractions / followerCount) * 100).toFixed(1)
                    : "0.0";

                return {
                  _id: item._id,
                  rank: index + 1,
                  name: item.businessName || "Unnamed Business",
                  description:
                    item.businessDescription || "No description available",
                  followers:
                    item.followers ||
                    Math.floor(Math.random() * 5000).toString(),
                  trend: "Rising",
                  siteUrl: item.businessWebsite || "#",
                  logoUrl:
                    item.businessLogo ||
                    "https://placehold.co/100x100?text=No+Logo",
                  posts: [],
                  postCategories: ["All"],
                  products: products,
                  productCategories: [
                    "All",
                    ...new Set(products.map((p: Product) => p.category)),
                  ],
                  totalPosts: 0,
                  totalProducts: products.length,
                  engagementRate: engagementRate,
                };
              } catch (error) {
                console.error(`Error loading company ${item._id}:`, error);
                return null;
              }
            })
          );

          const validCompanies = companiesWithDetails.filter(
            Boolean
          ) as Company[];
          setAllCompanies(validCompanies);

          const allProductsList: Product[] = [];
          validCompanies.forEach((company) => {
            company.products.forEach((product) => {
              allProductsList.push({
                ...product,
                companyId: company._id,
                companyName: company.name,
              });
            });
          });
          setAllProducts(allProductsList);
        }
      } catch (err) {
        console.error("Error loading search data:", err);
      }
    };

    loadSearchData();
  }, []);

  // Search functionality
  const handleSearch = useCallback(
    async (query: string) => {
      const lowerQuery = query.toLowerCase().trim();
      setSearchQuery(query);

      if (!lowerQuery) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        const companyResults = allCompanies
          .filter(
            (company) =>
              company.name.toLowerCase().includes(lowerQuery) ||
              company.description.toLowerCase().includes(lowerQuery)
          )
          .map((company) => ({
            id: company._id,
            name: company.name,
            type: "company" as const,
            imageUrl: company.logoUrl,
          }));

        const productResults = allProducts
          .filter(
            (product) =>
              product.name?.toLowerCase().includes(lowerQuery) ||
              product.category.toLowerCase().includes(lowerQuery) ||
              product.tags?.some((tag) =>
                tag.toLowerCase().includes(lowerQuery)
              )
          )
          .map((product) => ({
            id: product._id || `product-${Math.random()}`,
            name: product.name || product.category,
            type: "product" as const,
            companyId: product.companyId,
            companyName: product.companyName,
            imageUrl: product.imageUrl,
            price: product.price,
          }));

        const combinedResults = [...companyResults, ...productResults];
        setSearchResults(combinedResults);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    },
    [allCompanies, allProducts]
  );

  const handleSelectSearchResult = (result: SearchResult) => {
    if (result.type === "company") {
      navigate(`#company-${result.id}`);
    } else if (result.type === "product" && result.companyId) {
      navigate(`#company-${result.companyId}`);
      setTimeout(() => {
        const productsTab = document.querySelector(
          '.tab[data-tab="Products"]'
        ) as HTMLElement;
        if (productsTab) productsTab.click();
      }, 100);
    }
  };

  const handleSearchClick = () => {
    navigate('#search');
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchBack = () => {
    window.history.back();
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate('#home');
  };

  const handleNavClick = (page: string) => {
    switch (page) {
      case "Home":
        navigate('#home');
        break;
      case "Profile":
        navigate('#profile');
        break;
      case "Posts":
        navigate('#posts');
        break;
      case "About":
        navigate('#about');
        break;
      default:
        navigate('#home');
    }
  };

  const handleProfileClick = () => {
    if (user?.isLoggedIn) {
      navigate('#profile');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSelectCompany = (company: Company) => {
    navigate(`#company-${company._id}`);
  };

  // Updated handleSelectPost to store both post and company data
  const handleSelectPost = (post: Post, company: Company) => {
    console.log("Selecting post:", post._id, "from company:", company._id);
    setSelectedPost({ post, company });
    navigate(`#post-${post._id}`);
  };

  const handleClaimOffer = (promotion: Promotion) => {
    console.log("Claiming offer:", promotion);
    if (promotion.targetUrl) {
      window.open(promotion.targetUrl, "_blank");
    }
    alert(
      `Offer claimed! ${
        promotion.discountCode
          ? `Use code: ${promotion.discountCode}`
          : promotion.couponCode
          ? `Use code: ${promotion.couponCode}`
          : ""
      }`
    );
  };

  const renderHeader = () => {
    if (isSearchActive) return null;

    if (selectedPostId)
      return <Header title="Post" onBack={() => window.history.back()} />;
    if (selectedCompany)
      return <Header title="Profile" onBack={() => window.history.back()} />;
    if (routeParams.type === "profile")
      return (
        <Header title="My Profile" onBack={() => window.history.back()} />
      );
    if (routeParams.type === "about")
      return <Header title="About Us" onBack={() => window.history.back()} />;
    if (routeParams.type === "posts")
      return <Header title="Posts" onBack={() => window.history.back()} />;

    return (
      <Header
        user={user || undefined}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onRegister={() => setShowRegisterModal(true)}
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMobileMenuOpen}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
      />
    );
  };

const renderPage = () => {
  console.log("Current route:", routeParams.type, "selectedPostId:", selectedPostId, "selectedPost:", selectedPost);

  if (isSearchActive) {
    return (
      <SearchPage
        searchQuery={searchQuery}
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
        onSearchChange={handleSearch}
        onBack={handleSearchBack}
        loading={searchLoading}
      />
    );
  }

  if (selectedPostId) {
    if (selectedPost) {
      return (
        <PostDetailPage
          data={selectedPost}
          onBack={() => window.history.back()}
          user={user || undefined}
          onLoginRequest={() => setShowLoginModal(true)}
        />
      );
    } else {
      return <div className="loading-container"><p>Loading post...</p></div>;
    }
  }

  if (selectedCompany) {
    return (
      <ProfilePage
        company={selectedCompany}
        onSelectPost={handleSelectPost}
        user={user || undefined}
        onLoginRequest={() => setShowLoginModal(true)}
      />
    );
  }

  switch (routeParams.type) {
    case "profile":
      if (user) {
        return (
          <UserProfilePage
            user={user}
            onBack={() => window.history.back()}
            onSelectCompany={handleSelectCompany}
            onLogout={handleLogout}
            allCompanies={allCompanies}
          />
        );
      } else {
        return <div className="p-4 text-center">Please log in to view your profile.</div>;
      }

    case "posts":
      return (
        <AllPostsPage
          onSelectPost={handleSelectPost}
          user={user || undefined}
          onLoginRequest={() => setShowLoginModal(true)}
        />
      );

    case "about":
      return <AboutPage />;

    case "privacy":
      return <PrivacyPolicyPage />;

    case "terms":
      return <TermsPage />;

    case "home":
    default:
      return (
        <>
          <Banner />
          <CompanyListPage
            onSelectCompany={handleSelectCompany}
            user={user || undefined}
            allPromotions={allPromotions}
            onClaimOffer={handleClaimOffer}
          />
          <Footer />
        </>
      );
  }
};


  return (
   <div className="app-container">
      {/* Bottom Navigation - Hidden on laptop/desktop */}
      {!isSearchActive && (
        <nav className="app-nav mobile-only">
          <a
            href="#home"
            className={`nav-item ${routeParams.type === "home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('#home');
            }}
          >
            <span className="material-icons">home</span>
            <span className="nav-text">Home</span>
          </a>
          <a
            href="#posts"
            className={`nav-item ${routeParams.type === "posts" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('#posts');
            }}
          >
            <span className="material-icons">article</span>
            <span className="nav-text">Posts</span>
          </a>
          {user && (
            <a
              href="#profile"
              className={`nav-item ${routeParams.type === "profile" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleProfileClick();
              }}
            >
              <span className="material-icons">account_circle</span>
              <span className="nav-text">My Profile</span>
            </a>
          )}
        </nav>
      )}

      <div className="main-column">
        {renderHeader()}

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activePage={routeParams.type}
          onNavClick={handleNavClick}
          user={user || undefined}
          onLogin={() => {
            setShowLoginModal(true);
            setIsMobileMenuOpen(false);
          }}
          onRegister={() => {
            setShowRegisterModal(true);
            setIsMobileMenuOpen(false);
          }}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
        />

        <div className="main-wrapper">{renderPage()}</div>
      </div>
  
     <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onOpenRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
        onOpenLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

// Add CSS styles
const promotionStyles = `
.promotion-banner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.promotion-banner:hover {
  transform: translateY(-2px);
}

.banner-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.banner-content {
  display: flex;
  align-items: center;
  padding: 16px;
  color: white;
}

.banner-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
}

.banner-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.banner-info p {
  margin: 0 0 8px 0;
  font-size: 14px;
  opacity: 0.9;
}

.discount-code {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.promotion-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.promotion-popup-content {
  background: white;
  border-radius: 16px;
  max-width: 450px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: popupEnter 0.3s ease-out;
}

.promotion-popup-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.promotion-popup-body {
  padding: 20px;
  text-align: center;
  color: #333;
}

.promotion-popup-body h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
}

.promotion-popup-body p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.5;
}

.promotion-popup-claim-btn {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
}

@keyframes popupEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

`;

// Add styles to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = promotionStyles;
  document.head.appendChild(styleSheet);
}

// ---------------- MOUNT REACT APP ----------------
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

export default App;
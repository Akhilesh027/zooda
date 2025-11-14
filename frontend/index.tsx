import React, { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

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

const API_BASE_URL = "https://api.zooda.in";

// Updated API Service for Promotions

// Update the API service to handle the new response structure
const getActivePromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await axios.get(`https://api.zooda.in/api/promotion`);

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

// Promotion tracking function
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

// ---------------- PROMOTION COMPONENTS ----------------
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
    // Mock data for demonstration since the API call will likely fail in this environment
    if (API_BASE_URL.includes("localhost")) {
      const mockData = [
        {
          _id: "b1",
          businessName: "The Organic Store",
          businessDescription: "Fresh and organic groceries.",
          businessCategory: "Groceries",
          logoUrl: "https://placehold.co/80x80/004d40/ffffff?text=ORG",
          products: [
            {
              _id: "p1",
              name: "Organic Apples",
              price: 150,
              category: "Fruit",
              tags: ["fresh", "fruit"],
              image: { url: "https://placehold.co/300x200/ff4d4d/ffffff?text=Apple" },
            },
            {
              _id: "p2",
              name: "Whole Wheat Bread",
              price: 80,
              category: "Bakery",
              tags: ["bread", "whole grain"],
              image: { url: "https://placehold.co/300x200/ff9900/ffffff?text=Bread" },
            },
          ],
        },
        {
          _id: "b2",
          businessName: "Tech Hub Electronics",
          businessDescription: "Latest gadgets and accessories.",
          businessCategory: "Electronics",
          logoUrl: "https://placehold.co/80x80/333333/00ccff?text=TECH",
          products: [
            {
              _id: "p4",
              name: "Wireless Mouse",
              price: 599,
              category: "Accessory",
              tags: ["computer", "office"],
              image: { url: "https://placehold.co/300x200/007bff/ffffff?text=Mouse" },
            },
            {
              _id: "p5",
              name: "4K Monitor - UltraSharp",
              price: 25000,
              category: "Display",
              tags: ["gaming", "work"],
              image: { url: "https://placehold.co/300x200/9933ff/ffffff?text=Monitor" },
            },
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
    onSearchChange(query); // Propagate the change up to the parent
  };

  const filtered = businesses.filter((business) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // 1. Business matches
    const businessMatches =
      business.businessName?.toLowerCase().includes(lowerQuery) ||
      business.businessDescription?.toLowerCase().includes(lowerQuery) ||
      business.businessCategory?.toLowerCase().includes(lowerQuery);

    // 2. Any product within the business matches
    const productMatches = business.products?.some((product: any) =>
      product.name?.toLowerCase().includes(lowerQuery) ||
      product.category?.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    );

    return businessMatches || productMatches;
  });

  return (
    <div className="search-page">
      {/* Header */}
      <header className="app-header">
        <button onClick={onBack} className="back-button">
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="search-input-wrapper">
          <span className="material-icons search-icon">search</span>
          <input
            type="text"
            placeholder="Search businesses and products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-page-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="search-results-container">
        {loading ? (
          <div className="search-loading">Loading businesses...</div>
        ) : filtered.length === 0 ? (
          <div className="search-no-results">No businesses or products found.</div>
        ) : (
          filtered.map((business) => (
            <div key={business._id} className="business-block">
              {/* Business Header */}
              <div className="business-card">
                <img
                  src={business.logoUrl || "https://placehold.co/80x80?text=Logo"}
                  alt={business.businessName}
                  className="business-logo"
                />
                <div className="business-info">
                  <h3>{business.businessName}</h3>
                   <div className="company-stats">
                    <span className="">followers : {business.followers}</span>
                    <span className="">ER : {business.engagementRate}</span>
                    <a href={business.businessWebsite || '#'} target="_blank" rel="noopener noreferrer">
                      <button className="visit-btn">
              Visit site
            </button>
                    </a>

          </div>
                  <p>{business.businessDescription}</p>
                 
                </div>
              </div>

              {/* Products Inside the Same Business Block */}
              {business.products?.length > 0 ? (
                <div className="products-grid">
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
                        className="product-card minimal"
                        // Click anywhere on the card to open the popup
                        onClick={() => setSelectedProduct(product)} 
                      >
                        <div className="product-details-text">
                            <p>
                                Product: <span className="product-name">{product.name}</span>
                            </p>
                            <p>
                                Price:<span className="product-price-text">₹{product.price || "N/A"}</span>
                            </p>
                        </div>
                       <button
  className="view-btn"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedProduct(product);
  }}
  title="View Details"
>
  <span className="material-icons">visibility</span>
</button>

                      </div>
                    ))}
                </div>
              ) : (
                <div className="no-products">No products listed for this business.</div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Image Popup */}
      {selectedProduct && (
        <div
          className="image-popup-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <img
              src={
                selectedProduct.image?.url ||
                "https://placehold.co/300x200?text=Product"
              }
              alt={selectedProduct.name}
            />
            
            <div className="popup-details">
                <h3>{selectedProduct.name}</h3>
                <span className="popup-price">₹{selectedProduct.price || "N/A"}</span>
              
               <a href={selectedProduct.productLink || '#'} target="_blank" rel="noopener noreferrer">
                 <button 
                    className="select-product-btn"
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
              className="close-popup"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        /* --- General and Header Styles (Kept as before) --- */
        .search-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }

        .app-header {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          border-bottom: 1px solid #222;
          background: #000;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          background: #111;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          flex: 1;
          margin-left: 0.8rem;
        }

        .search-page-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
          font-size: 1rem;
        }

        .search-icon {
          color: #aaa;
          margin-right: 0.4rem;
        }

        .search-clear {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
        }

        /* Business Block */
        .business-block {
          background: #111;
          border-radius: 12px;
          margin: 1rem;
          padding: 1rem;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.05);
        }

        .business-card {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #222;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .business-logo {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
          margin-right: 1rem;
        }

        .business-info h3 {
          margin: 0;
          color: #fff;
          font-size: 1.1rem;
        }

        .business-info p {
          margin: 2px 0;
          color: #bbb;
          font-size: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .business-category {
          display: inline-block;
          background: #007bff33;
          color: #007bff;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          margin-top: 4px;
        }
        /* --- End General and Header Styles --- */


        /* --- Product Card - Minimal Text View --- */
        .products-grid {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .product-card.minimal {
          background: #1a1a1a;
          border-radius: 10px;
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        
        .product-card.minimal:hover {
            background: #222;
            transform: translateY(-1px);
        }
        
        .product-details-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            min-width: 0;
        }
        
        .product-details-text p {
            margin: 0;
            line-height: 1.4;
            color: #ccc;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .product-name {
            font-weight: 600;
            color: #fff;
        }
        
        .product-price-text {
            color: #00ff99;
            font-weight: 600;
        }


        .view-btn {
          background: #4CAF50;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
    
          margin-left: 15px; /* Add space between text and button */
          flex-shrink: 0;
        }

        .view-btn:hover {
          background: #4CAF50;
        }
        
        .no-products, .search-loading, .search-no-results {
            padding: 1rem;
            color: #aaa;
            text-align: center;
            font-style: italic;
        }

        /* --- Popup Styles --- */
        .image-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .image-popup {
          background: #111;
          padding: 1.5rem;
          border-radius: 12px;
          position: relative;
          width: 90%;
          max-width: 380px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
        }

        .image-popup img {
          width: 100%;
          max-height: 250px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .popup-details h3 {
          margin: 0 0 0.5rem 0;
          color: #fff;
          font-size: 1.4rem;
        }

        .popup-price {
          color: #00ff99;
          margin-top: 4px;
          font-weight: 700;
          font-size: 1.2rem;
          display: block;
          margin-bottom: 1rem;
        }

        .popup-description {
            color: #ccc;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }

        .select-product-btn {
            background: #00ff99;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s;
        }

        .select-product-btn:hover {
            background: #00e685;
        }

        .close-popup {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
        }
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
        <span className="material-icons">hub</span>
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

// ---------------- USER PROFILE PAGE ----------------
interface UserProfilePageProps {
  user: User;
  onBack: () => void;
  onSelectCompany: (company: Company) => void;
  onLogout: () => void;
  allCompanies: Company[];
}

const UserProfilePage = ({
  user,
  onBack,
  onSelectCompany,
  onLogout,
  allCompanies,
}: UserProfilePageProps) => {
  const [followingBusinesses, setFollowingBusinesses] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [user._id, allCompanies]);

  useEffect(() => {
    fetchFollowingBusinesses();
  }, [fetchFollowingBusinesses]);

  return (
    <div className="user-profile-page">
      <main className="profile-content">
        <section className="user-details-section">
          <div className="profile-avatar">
            <span className="material-icons">account_circle</span>
          </div>
          <h1 className="user-name">{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <button onClick={onLogout} className="btn btn-outline logout-btn">
            Logout
          </button>
        </section>

        <hr className="profile-divider" />

        
      </main>
    </div>
  );
};

// ---------------- COMPANY LIST ITEM ----------------
interface CompanyListItemProps {
  company: Company;
  onSelectCompany: (company: Company) => void;
  user?: User;
}

const CompanyListItem = ({
  company,
  onSelectCompany,
  user,
}: CompanyListItemProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState<number>(
    Number(company.followers) || 0 // ✅ Always a valid number
  );

  // ✅ Check follow status
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user?._id && company._id) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/follow/${company._id}/status/${user._id}`
          );

          if (response.data.success) {
            setIsFollowing(response.data.isFollowing);
            // ✅ If backend sends latest followers count, use it
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

  // ✅ Handle follow/unfollow
  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user?._id) {
      alert("Please login to follow companies");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/follow/${company._id}`,
        { userId: user._id }
      );

      if (response.data.success) {
        setIsFollowing(response.data.isFollowing);
        // ✅ Always ensure it's a number
        setFollowers(Number(response.data.followers) || 0);
      }
    } catch (err: any) {
      console.error("Follow error:", err);
      alert(err.response?.data?.message || "An error occurred");
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
            <span>{company.engagementRate}% ER</span>
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

// ---------------- UPDATED COMPANY LIST PAGE WITH PROMOTIONS ----------------
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

  // ✅ Insert banner after every 2 companies
  const zigzagContent = React.useMemo(() => {
    const content: Array<Company | Promotion> = [];
    let bannerIndex = 0;

    filteredCompanies.forEach((company, index) => {
      content.push(company);
      if ((index + 1) % 2 === 0 && bannerPromotions.length > 0) {
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

  if (loading)
    return <div className="p-4 text-center">Loading companies...</div>;

  return (
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

      {/* Filters */}
      <div className="filters flex gap-4 p-4 items-center">
        <div>
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
          <div>
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
      <div className="company-cards-wrapper">
        {zigzagContent.length > 0 ? (
          zigzagContent.map((item, index) => {
            if ("rank" in item) {
              return (
                <CompanyListItem
                  key={`company-${item._id}-${index}`}
                  company={{
                    ...item,
                    engagementRate: (item.engagementRate as number).toFixed(1),
                  }}
                  onSelectCompany={onSelectCompany}
                  user={user}
                />
              );
            } else {
              return (
                <PromotionBanner
                  key={`banner-${item._id}-${index}`}
                  promotion={item as Promotion}
                  onClaimOffer={onClaimOffer}
                />
              );
            }
          })
        ) : (
          <div className="text-center text-gray-600 p-4">
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
  );
};

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
          <div className="mobile-menu-logo">
            <span className="material-icons">hub</span>
            <span className="logo-text">Zetova</span>
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

// ---------------- ABOUT PAGE ----------------
const AboutPage = () => {
  return (
    <main className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Zooda</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Zooda connects businesses with their audience through powerful
              social media insights and engagement tools. We help companies
              showcase their products, share their stories, and build meaningful
              connections with their customers.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="material-icons">business</span>
                <h3>Company Profiles</h3>
                <p>Discover and follow your favorite businesses</p>
              </div>
              <div className="feature-card">
                <span className="material-icons">feed</span>
                <h3>Social Posts</h3>
                <p>Explore engaging content from various companies</p>
              </div>
              <div className="feature-card">
                <span className="material-icons">shopping_bag</span>
                <h3>Product Showcase</h3>
                <p>Browse and discover amazing products</p>
              </div>
              <div className="feature-card">
                <span className="material-icons">trending_up</span>
                <h3>Analytics</h3>
                <p>Track engagement and performance metrics</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Join Our Community</h2>
            <p>
              Whether you're a business looking to grow your presence or a
              customer wanting to discover new brands, Zooda provides the
              platform to connect, engage, and grow together.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};


// ---------------- ALL POSTS PAGE ----------------
interface AllPostsPageProps {
  onSelectPost: (post: Post) => void;
  user?: User;
}

const AllPostsPage = ({ onSelectPost, user }: AllPostsPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"Following" | "Unfollowing">(
    "Following"
  );

  const fetchPosts = useCallback(async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      setError("");

      const endpoint =
        activeTab === "Following"
          ? `${API_BASE_URL}/api/posts/following/${user._id}`
          : `${API_BASE_URL}/api/posts/unfollowed/${user._id}`;

      const response = await axios.get(endpoint);
      const data = response.data;

      if (data.success && Array.isArray(data.posts)) {
        const processed = data.posts.map((post: any, i: number) => {
          let imageUrl =
            post.media?.[0]?.url ||
            post.mediaUrl ||
            post.imageUrl ||
            `https://picsum.photos/600/400?random=${i}`;

          if (!imageUrl.startsWith("http")) {
            imageUrl = `${API_BASE_URL}${
              imageUrl.startsWith("/") ? "" : "/"
            }${imageUrl}`;
          }

          return {
            ...post,
            _id: post._id || `post-${i}`,
            imageUrl,
          };
        });
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

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, activeTab]);

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
        <div className="posts-grid">
          {posts.map((post) => (
            <div
              key={post._id}
              className="post-card"
              onClick={() => onSelectPost(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.content || "Post image"}
                className="post-img"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

// ---------------- POST ITEM ----------------
interface PostItemProps {
  post: Post;
  company: Company;
  user?: User;
}

const PostItem = ({ post, company, user }: PostItemProps) => {
  const companyUsername = company.name.toLowerCase().replace(/[\s.]/g, "_");
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || 0);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user?._id && post._id) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/post/${post._id}/like-status/${user._id}`
          );
          setIsLiked(response.data.isLiked);
        } catch (err) {
          console.error("Error checking like status:", err);
        }
      }
    };

    const loadComments = async () => {
      if (post._id) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/post/${post._id}/comments`
          );
          setPostComments(response.data.comments || []);
        } catch (err) {
          console.error("Error loading comments:", err);
        }
      }
    };

    checkLikeStatus();
    loadComments();
  }, [user?._id, post._id]);

  const formattedDate = new Date(
    post.createdAt || post.date
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const imageUrl = post.mediaUrl;

  const handleLike = async () => {
    if (!user?._id) {
      alert("Please login to like posts");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/post/${post._id}/like`,
        {
          userId: user._id,
        }
      );
      setLikes(response.data.likesCount);
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !post._id) return;

    if (!user?._id) {
      alert("Please login to comment");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/post/${post._id}/comment`,
        {
          text: commentText,
          userId: user._id,
        }
      );
      setComments(response.data.commentsCount);
      setCommentText("");

      const commentsResponse = await axios.get(
        `${API_BASE_URL}/api/post/${post._id}/comments`
      );
      setPostComments(commentsResponse.data.comments || []);
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  const toggleComments = async () => {
    if (!showComments && post._id) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/post/${post._id}/comments`
        );
        setPostComments(response.data.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <article className="post-feed-item">
      <div className="post-image-container">
        <img
          src={`${imageUrl}`}
          alt={post.content || post.caption || "Post image"}
          className="post-image"
        />
      </div>

      <section className="post-details">
        <div className="post-engagement-icons">
          <div className="left-icons">
            <span
              className="material-icons"
              title="Like"
              onClick={handleLike}
              style={{
                color: isLiked ? "red" : "inherit",
                cursor: "pointer",
              }}
            >
              {isLiked ? "favorite" : "favorite_border"}
            </span>
            <span
              className="material-icons"
              title="Comment"
              onClick={toggleComments}
              style={{ cursor: "pointer" }}
            >
              chat_bubble_outline
            </span>
            <span className="material-icons" title="Share">
              send
            </span>
          </div>
          <span className="material-icons" title="Bookmark">
            bookmark_border
          </span>
        </div>

        {likes > 0 && (
          <div className="post-stats">
            <strong>
              {likes.toLocaleString()} {likes === 1 ? "like" : "likes"}
            </strong>
          </div>
        )}

        <div className="post-caption">
          <strong>{companyUsername}</strong> {post.content || post.caption}
        </div>

        {comments > 0 && (
          <button
            className="post-comments-link"
            onClick={toggleComments}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: 0,
            }}
          >
            View all {comments.toLocaleString()}{" "}
            {comments === 1 ? "comment" : "comments"}
          </button>
        )}

        {showComments && (
          <div className="comments-section">
            {postComments.map((comment, index) => (
              <div key={index} className="comment-item">
                <strong>User</strong> {comment.text}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
          />
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={!commentText.trim()}
          >
            Post
          </button>
        </form>

        <p className="post-date">{formattedDate}</p>
      </section>
    </article>
  );
};

// ---------------- UPDATED PROFILE PAGE (PROMOTIONS REMOVED) ----------------
interface ProfilePageProps {
  company: Company;
  onSelectPost: (post: Post) => void;
  user?: User;
}

const ProfilePage = ({ company, onSelectPost, user }: ProfilePageProps) => {
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

        setPosts(postsData.posts || []);
        setProducts(productsData.products || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error fetching company content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [company._id]);

  const handleFollow = async () => {
    if (!user?._id) {
      alert("Please login to follow companies");
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
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  const filteredPosts =
    activePostCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activePostCategory);

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
              <div className="stat-item">
                <span className="stat-number">{company.engagementRate}%</span>
                <span className="stat-label">Engagement</span>
              </div>
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

        <hr className="profile-divider" />

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
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {activeTab === "Posts" && (
              <section className="content-grid">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post._id}
                      className="grid-item"
                      onClick={() => onSelectPost(post)}
                      role="button"
                    >
                      <img src={`${post.mediaUrl}`} alt={post.caption} />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No posts yet.</p>
                )}
              </section>
            )}

            {activeTab === "Products" && (
              <>
                <div className="product-tags flex gap-2 mb-4">
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
                        >
                          <img
                            src={`${product.image.url}`}
                            alt={product.name}
                            className="product-image"
                          />
                          <div className="product-info">
                            <p className="product-price">₹{product.price}</p>
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No products yet.</p>
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

// ---------------- POST DETAIL PAGE ----------------
interface PostDetailPageProps {
  data: { post: Post; company: Company };
  onBack: () => void;
  user?: User;
}

const PostDetailPage = ({ data, onBack, user }: PostDetailPageProps) => (
  <div className="post-detail-page">
    <Header title="Post" onBack={onBack} />
    <main className="post-detail-content">
      <PostItem post={data.post} company={data.company} user={user} />
    </main>
  </div>
);
// ---------------- FOOTER COMPONENT ----------------
interface FooterProps {
  activePage: string;
  onNavClick: (page: string) => void;
  user?: User | null;
}

const Footer = ({ activePage, onNavClick, user }: FooterProps) => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Logo and Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="material-icons">hub</span>
            <span className="logo-text">Zetova</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <a 
            href="#" 
            className={`footer-link ${activePage === "Home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavClick("Home");
            }}
          >
            Home
          </a>
          <a 
            href="#" 
            className={`footer-link ${activePage === "About" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavClick("About");
            }}
          >
            About Us
          </a>
          <a 
            href="#" 
            className={`footer-link ${activePage === "Posts" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavClick("Posts");
            }}
          >
            Posts
          </a>
          {user && (
            <a 
              href="#" 
              className={`footer-link ${activePage === "Profile" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick("Profile");
              }}
            >
              Profile
            </a>
          )}
        </div>

        {/* Business Registration Link */}
        <div className="footer-business">
          <a 
            href="https://client.zooda.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="business-registration-link"
          >
            Business Registration
          </a>
        </div>
      </div>
    </footer>
  );
};

// Add the Footer CSS styles
const footerStyles = `
.app-footer {
  background: #000;
  border-top: 1px solid #222;
  padding: 1.5rem 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
}

.footer-logo .material-icons {
  font-size: 1.5rem;
  color: #00ff99;
}

.logo-text {
  background: linear-gradient(135deg, #00ff99, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
}

.footer-link:hover {
  color: #00ff99;
}

.footer-link.active {
  color: #00ff99;
  font-weight: 600;
}

.footer-business {
  margin-top: 0.5rem;
}

.business-registration-link {
  color: #00ccff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 1px solid #00ccff;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.business-registration-link:hover {
  background: #00ccff;
  color: #000;
}

/* Responsive Design */
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  
  .footer-links {
    gap: 2rem;
  }
  
  .footer-business {
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1rem 0.5rem;
  }
  
  .footer-links {
    gap: 1rem;
  }
  
  .footer-link {
    font-size: 0.85rem;
  }
  
  .business-registration-link {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}
`;

// Add footer styles to document
if (typeof document !== "undefined") {
  const footerStyleSheet = document.createElement("style");
  footerStyleSheet.textContent = footerStyles;
  document.head.appendChild(footerStyleSheet);
}
// ---------------- LOGIN MODAL ----------------
// ---------------- LOGIN MODAL ----------------
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
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

      const userToStore = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        isLoggedIn: false,
      };

      localStorage.setItem("recentRegisteredUser", JSON.stringify(userToStore));
      onRegister(userToStore);
      
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setInterests([]);
      setError("");
      
      // Close register modal and open login modal
      onClose();
      setTimeout(() => {
        onOpenLogin();
      }, 300);
      
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
            
            {interests.length > 0 && (
              <div className="selected-interests">
                <strong>Selected: </strong>
                {interests.join(", ")}
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

// ---------------- MAIN APP COMPONENT ----------------
const App = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedPost, setSelectedPost] = useState<{
    post: Post;
    company: Company;
  } | null>(null);
  const [activePage, setActivePage] = useState("Home");
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allPromotions, setAllPromotions] = useState<Promotion[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

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
      const company = allCompanies.find((c) => c._id === result.id);
      if (company) {
        setSelectedCompany(company);
        setActivePage("Home");
        setSelectedPost(null);
        setIsSearchActive(false);
      }
    } else if (result.type === "product" && result.companyId) {
      const company = allCompanies.find((c) => c._id === result.companyId);
      if (company) {
        setSelectedCompany(company);
        setActivePage("Home");
        setSelectedPost(null);
        setIsSearchActive(false);
        setTimeout(() => {
          const productsTab = document.querySelector(
            '.tab[data-tab="Products"]'
          ) as HTMLElement;
          if (productsTab) productsTab.click();
        }, 100);
      }
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchBack = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    setSearchResults([]);
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
    handleNavClick("Home");
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setSelectedCompany(null);
    setSelectedPost(null);
    setIsSearchActive(false);
  };

  const handleProfileClick = () => {
    if (user?.isLoggedIn) {
      setActivePage("Profile");
      setSelectedCompany(null);
      setSelectedPost(null);
      setIsSearchActive(false);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

    if (selectedPost)
      return <Header title="Post" onBack={() => setSelectedPost(null)} />;
    if (selectedCompany)
      return <Header title="Profile" onBack={() => setSelectedCompany(null)} />;
    if (activePage === "Profile")
      return (
        <Header title="My Profile" onBack={() => handleNavClick("Home")} />
      );
    if (activePage === "About")
      return <Header title="About Us" onBack={() => handleNavClick("Home")} />;
    if (activePage === "Posts")
      return <Header title="Posts" onBack={() => handleNavClick("Home")} />;

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

    if (selectedPost)
      return (
        <PostDetailPage
          data={selectedPost}
          onBack={() => setSelectedPost(null)}
          user={user || undefined}
        />
      );

    if (selectedCompany)
      return (
        <ProfilePage
          company={selectedCompany}
          onSelectPost={(post) =>
            setSelectedPost({ post, company: selectedCompany })
          }
          user={user || undefined}
        />
      );

    switch (activePage) {
      case "Profile":
        if (user) {
          return (
            <UserProfilePage
              user={user}
              onBack={() => handleNavClick("Home")}
              onSelectCompany={(company) => setSelectedCompany(company)}
              onLogout={handleLogout}
              allCompanies={allCompanies}
            />
          );
        } else {
          return (
            <div className="p-4 text-center">
              Please log in to view your profile.
            </div>
          );
        }

      case "Posts":
        return (
          <AllPostsPage
            onSelectPost={(post) => {
              const company = allCompanies.find(
                (c) => c._id === post.businessId
              );
              const minimalCompany: Company = {
                _id: post.businessId || "unknown",
                rank: 0,
                name: company?.name || "Company",
                description: company?.description || "",
                followers: company?.followers || "0",
                trend: "",
                siteUrl: company?.siteUrl || "#",
                logoUrl: company?.logoUrl || "",
                posts: [],
                postCategories: [],
                products: [],
                productCategories: [],
                engagementRate: company?.engagementRate || "0.0",
              };
              setSelectedPost({ post, company: minimalCompany });
            }}
            user={user || undefined}
          />
        );

      case "About":
        return <AboutPage />;

      case "Home":
      default:
        return (
          <>
            <Banner />
            <CompanyListPage
              onSelectCompany={(company) => setSelectedCompany(company)}
              user={user || undefined}
              allPromotions={allPromotions}
              onClaimOffer={handleClaimOffer}
            />
            
          </>
        );
    }
  };

  return (
    <div className="app-container">
      {!isSearchActive && (
        <nav className="app-nav">
          <a
            href="#"
            className={`nav-item ${activePage === "Home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home");
            }}
          >
            <span className="material-icons">home</span>
            <span className="nav-text">Home</span>
          </a>
          <a
            href="#"
            className={`nav-item ${activePage === "Posts" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Posts");
            }}
          >
            <span className="material-icons">article</span>
            <span className="nav-text">Posts</span>
          </a>
          {user && (
            <a
              href="#"
              className={`nav-item ${activePage === "Profile" ? "active" : ""}`}
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
          activePage={activePage}
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

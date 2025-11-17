import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/api.ts";

interface Props {
  searchQuery: string;
  onSelectSearchResult: (result: any) => void;
  onSearchChange: (query: string) => void;
  onBack: () => void;
  searchResults: any[];
  loading: boolean;
}

const SearchPage: React.FC<Props> = ({ onSelectSearchResult, onSearchChange, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/business/search`);
      const data = await res.json();
      if (data.success && Array.isArray(data.businesses)) setBusinesses(data.businesses);
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
    <div className="search-page">
      <header className="app-header">
        <button onClick={onBack} className="back-button"><span className="material-icons">arrow_back</span></button>
        <div className="search-input-wrapper">
          <span className="material-icons search-icon">search</span>
          <input type="text" placeholder="Search businesses and products..." value={searchQuery} onChange={handleSearchChange} className="search-page-input" />
          {searchQuery && <button className="search-clear" onClick={() => setSearchQuery("")}><span className="material-icons">close</span></button>}
        </div>
      </header>

      <main className="search-results-container">
        {loading ? <div className="search-loading">Loading businesses...</div> : filtered.length === 0 ? <div className="search-no-results">No businesses or products found.</div> : (
          filtered.map((business) => (
            <div key={business._id} className="business-block">
              <div className="business-card">
                <img src={business.logoUrl || "https://placehold.co/80x80?text=Logo"} alt={business.businessName} className="business-logo" />
                <div className="business-info">
                  <h3>{business.businessName}</h3>
                  <p>{business.businessDescription}</p>
                </div>
              </div>

              {business.products?.length > 0 ? (
                <div className="products-grid">
                  {business.products.filter((product: any) => {
                    if (!searchQuery) return true;
                    const lowerQuery = searchQuery.toLowerCase();
                    return product.name?.toLowerCase().includes(lowerQuery) || product.category?.toLowerCase().includes(lowerQuery) || product.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery));
                  }).map((product: any) => (
                    <div key={product._id} className="product-card minimal" onClick={() => setSelectedProduct(product)}>
                      <div className="product-details-text">
                        <p>Product: <span className="product-name">{product.name}</span></p>
                        <p>Price: <span className="product-price-text">₹{product.price || "N/A"}</span></p>
                      </div>
                      <button className="view-btn" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} title="View Details"><span className="material-icons">visibility</span></button>
                    </div>
                  ))}
                </div>
              ) : <div className="no-products">No products listed for this business.</div>}
            </div>
          ))
        )}
      </main>

      {selectedProduct && (
        <div className="image-popup-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image?.url || "https://placehold.co/300x200?text=Product"} alt={selectedProduct.name} />
            <div className="popup-details">
              <h3>{selectedProduct.name}</h3>
              <span className="popup-price">₹{selectedProduct.price || "N/A"}</span>
              <button className="select-product-btn" onClick={() => { onSelectSearchResult(selectedProduct); setSelectedProduct(null); }}>Select Product</button>
            </div>
            <button className="close-popup" onClick={() => setSelectedProduct(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

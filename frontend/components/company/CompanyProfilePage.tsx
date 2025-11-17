import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api.ts";

interface User {
  _id?: string;
  name?: string;
}

interface Company {
  _id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  followers?: number;
  engagementRate?: number;
  businessWebsite?: string;
  products?: any[];
  posts?: any[];
}

const CompanyProfilePage = ({
  company,
  user,
  onBack,
  onSelectPost,
  onSelectProduct,
}: {
  company: Company;
  user?: User;
  onBack: () => void;
  onSelectPost: (post: any) => void;
  onSelectProduct: (product: any) => void;
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState<number>(
    company.followers || 0
  );

  const [activeTab, setActiveTab] = useState<"Posts" | "Products">("Posts");

  useEffect(() => {
    checkFollowStatus();
  }, [user?._id, company._id]);

  const checkFollowStatus = async () => {
    if (!user?._id) return;

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/follow/${company._id}/status/${user._id}`
      );

      if (res.data.success) {
        setIsFollowing(res.data.isFollowing);
        setFollowers(Number(res.data.followers));
      }
    } catch (err) {
      console.error("Follow status error", err);
    }
  };

  const handleFollow = async () => {
    if (!user?._id) return alert("Please login first");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/follow/${company._id}`, {
        userId: user._id,
      });

      if (res.data.success) {
        setIsFollowing(res.data.isFollowing);
        setFollowers(Number(res.data.followers));
      }
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  return (
    <div className="company-profile-page">
      {/* Header */}
      <header className="app-header app-header--navigation">
        <button className="back-button" onClick={onBack}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>Company Profile</h1>
        <div></div>
      </header>

      {/* Main */}
      <main className="company-profile-container">
        {/* Top card */}
        <section className="company-profile-card">
          <img
            src={company.logoUrl}
            alt={company.name}
            className="company-profile-logo"
          />

          <h2 className="company-profile-name">{company.name}</h2>

          {company.description && (
            <p className="company-profile-description">
              {company.description}
            </p>
          )}

          <div className="company-profile-stats">
            <span>{followers} Followers</span>
            <span>{company.engagementRate}% ER</span>
          </div>

          <button
            className={`follow-btn ${isFollowing ? "following" : ""}`}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow +"}
          </button>

          {company.businessWebsite && (
            <button
              className="visit-btn"
              onClick={() =>
                window.open(company.businessWebsite, "_blank")
              }
            >
              Visit Site
            </button>
          )}
        </section>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "Posts" ? "active" : ""}`}
              onClick={() => setActiveTab("Posts")}
            >
              Posts
            </button>

            <button
              className={`tab ${activeTab === "Products" ? "active" : ""}`}
              onClick={() => setActiveTab("Products")}
            >
              Products
            </button>
          </div>
        </div>

        {/* Posts */}
        {activeTab === "Posts" && (
          <div className="posts-feed">
            {company.posts?.length ? (
              company.posts.map((post: any, i: number) => (
                <div
                  key={i}
                  className="post-feed-item"
                  onClick={() => onSelectPost(post)}
                >
                  <img src={post.imageUrl} alt="" />
                  <p className="post-caption">{post.caption}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No posts uploaded.</p>
            )}
          </div>
        )}

        {/* Products */}
        {activeTab === "Products" && (
          <div className="products-grid">
            {company.products?.length ? (
              company.products.map((product: any, idx: number) => (
                <div
                  key={idx}
                  className="product-card"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image?.url}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>₹{product.price || "N/A"}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No products found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyProfilePage;

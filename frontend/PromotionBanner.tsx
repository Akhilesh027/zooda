import React from "react";
import { Promotion } from "./path-to-promotion-service";

interface PromotionBannerProps {
  promotion: Promotion;
  onClaimOffer: (promotion: Promotion) => void;
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ promotion, onClaimOffer }) => {
  const getImageUrl = () => {
    if (!promotion.imageUrl && !promotion.image) return "";
    const url = promotion.imageUrl || promotion.image || "";
    return url.startsWith("http") ? url : `http://192.168.0.102:5000${url}`;
  };

  const getDiscountDisplay = () => {
    if (promotion.discountType === "percentage" && promotion.discountValue)
      return `${promotion.discountValue}% OFF`;
    if ((promotion.discountType === "fixed" || promotion.discountPercentage) && promotion.discountValue)
      return `₹${promotion.discountValue} OFF`;
    return "SPECIAL OFFER";
  };

  const discountDisplay = getDiscountDisplay();

  return (
    <div className="promotion-banner">
      <div className="banner-image">
        <img src={getImageUrl()} alt={promotion.name} />
      </div>
      <div className="banner-content">
        <h4 className="banner-title">{promotion.name}</h4>
        <p className="banner-description">{promotion.description}</p>
        {(promotion.discountCode || promotion.couponCode) && (
          <div className="banner-code">
            Use code <span className="code-highlight">{promotion.discountCode || promotion.couponCode}</span>
          </div>
        )}
        <div className="banner-discount">{discountDisplay}</div>
        <div className="banner-actions">
          <button className="btn btn-small btn-solid" onClick={() => onClaimOffer(promotion)}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;

import React from "react";
import { Promotion } from "./path-to-promotion-service";

interface PromotionPopupProps {
  promotion: Promotion;
  onClaimOffer: (promotion: Promotion) => void;
  onClose: () => void;
}

const PromotionPopup: React.FC<PromotionPopupProps> = ({ promotion, onClaimOffer, onClose }) => {
  const getImageUrl = () => {
    if (!promotion.imageUrl && !promotion.image) return "";
    const url = promotion.imageUrl || promotion.image || "";
    return url.startsWith("http") ? url : `https://api.zooda.in${url}`;
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
    <div className="promotion-popup-overlay" onClick={onClose}>
      <div className="promotion-popup" onClick={e => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>×</button>
        <div className="popup-image">
          <img src={getImageUrl()} alt={promotion.name} />
          <div className="discount-badge">{discountDisplay}</div>
        </div>
        <div className="popup-content">
          <h3 className="popup-title">{promotion.name}</h3>
          <p className="popup-description">{promotion.description}</p>
          {(promotion.discountCode || promotion.couponCode) && (
            <div className="promo-code">
              <span>Use code </span>
              <strong className="code-text">{promotion.discountCode || promotion.couponCode}</strong>
            </div>
          )}
          <div className="popup-actions">
            <button className="btn btn-outline" onClick={onClose}>Maybe Later</button>
            <button className="btn btn-solid" onClick={() => onClaimOffer(promotion)}>Claim Offer</button>
          </div>
          <div className="popup-footer">
            <span>Offer ends: {new Date(promotion.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionPopup;

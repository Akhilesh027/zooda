import React, { useEffect } from "react";
import { Promotion, trackPromotionEvent } from "../../utils/api.ts";

interface Props {
  promotion: Promotion;
  onClose: () => void;
  onClaimOffer: (promotion: Promotion) => void;
}
const PromotionPopup: React.FC<Props> = ({ promotion, onClose, onClaimOffer }) => {
  useEffect(() => {
    trackPromotionEvent(promotion._id, "impression");
    const shownPromos = JSON.parse(localStorage.getItem("shownPromotions") || "[]");
    if (!shownPromos.includes(promotion._id)) {
      shownPromos.push(promotion._id);
      localStorage.setItem("shownPromotions", JSON.stringify(shownPromos));
    }
  }, [promotion._id]);

  return (
    <div className="promotion-popup-overlay" onClick={onClose}>
      <div className="promotion-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="banner-close" onClick={onClose}>×</button>
        <img src={promotion.image} alt={promotion.name} className="promotion-popup-image" />
        <div className="promotion-popup-body">
          <h3>{promotion.name}</h3>
          <p>{promotion.description}</p>
          {(promotion.discountCode || promotion.couponCode) && <div className="promotion-code">Use code: <strong>{promotion.discountCode || promotion.couponCode}</strong></div>}
          <button className="promotion-popup-claim-btn" onClick={() => onClaimOffer(promotion)}>Claim Offer Now</button>
        </div>
      </div>
    </div>
  );
};

export default PromotionPopup;

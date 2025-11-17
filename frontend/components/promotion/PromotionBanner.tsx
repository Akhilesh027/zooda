import React, { useEffect, useState } from "react";
import { Promotion, trackPromotionEvent } from "../../utils/api.ts";

interface Props {
  promotion: Promotion;
  onClose?: () => void;
  onClaimOffer: (promotion: Promotion) => void;
}
const PromotionBanner: React.FC<Props> = ({ promotion, onClose, onClaimOffer }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    trackPromotionEvent(promotion._id, "impression");
  }, [promotion._id]);

  const handleClick = () => {
    trackPromotionEvent(promotion._id, "click");
    onClaimOffer(promotion);
  };

  if (!visible) return null;

  return (
    <div className="promotion-banner">
      {onClose && <button className="banner-close" onClick={() => setVisible(false)}>×</button>}
      <div className="banner-content" onClick={handleClick}>
        <img src={promotion.image} alt={promotion.name} className="banner-image" />
        <div className="banner-info">
          <h4>{promotion.name}</h4>
          <p>{promotion.description}</p>
          {(promotion.discountCode || promotion.couponCode) && <span className="discount-code">Use code: {promotion.discountCode || promotion.couponCode}</span>}
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;

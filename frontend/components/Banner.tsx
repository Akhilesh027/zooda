import React from "react";

const Banner: React.FC = () => {
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

export default Banner;

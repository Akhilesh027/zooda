import React from "react";

const Footer: React.FC<{ companyName?: string; logoUrl?: string }> = ({ companyName = "Zetova", logoUrl }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-brand">
            {logoUrl ? <img src={logoUrl} alt={companyName} className="footer-logo" /> : <div className="footer-logo-placeholder">{companyName.charAt(0)}</div>}
            <span className="footer-company-name">{companyName}</span>
          </div>
        </div>
        <div className="footer-row">
          <nav className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/posts">Posts</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div className="footer-row">
          <small>© {currentYear} {companyName}. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
